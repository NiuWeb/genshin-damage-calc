import { artbox, scaling, stats } from "@src/core"
import { Modifier } from "@src/core/subject"
import { strings } from "@src/strings"
import { Table } from "@src/strings/table"
import { RestrictedInts } from "@src/utils/combinations/restricted_ints"
import { toPlaces } from "@src/utils/numbers"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Filter } from "../filter"
import { Optimizer } from "../optimizer"
import { Config, Result } from "./type"

const MAX_SUBSTATS = 5
export class SubstatsOptimizer extends Optimizer<number[], Result, Config> {
    private queue = new PriorityQueue<Result>()
    private generator?: Generator<number[], void, void>
    private modifiers?: Modifier[]

    private initDamage = 0

    protected init(config: Config): void {
        if (config.substats.length > MAX_SUBSTATS) {
            throw new Error(`Cannot optimize more than ${MAX_SUBSTATS} substats at once. Requested ${config.substats.length} substats instead`)
        }
        const target = this.GetTarget()
        const arts = (() => {
            const arts = target.GetArtifacts()
            if (!arts) {
                const a = new artbox.Artbox(target)
                target.SetArtifacts(a)
                return a
            }
            return arts
        })()
        this.initDamage = this.Run()

        for (const art of arts.GetArtifacts()) {
            art.SetStars(5)
            art.ClearSubstats()
        }

        const substats = config.substats.map(({ stat }) => stat)
        const mins = config.substats.map(({ min }) => min)
        const maxs = config.substats.map(({ max }) => max)

        this.modifiers = substats.map(sub => target.GetCharacter().CreateModifier(sub, 0))
        this.generator = RestrictedInts(substats.length, config.total, mins, maxs)
    }
    *Generate() {
        if (!this.generator) {
            throw new Error("No generator has been initialized")
        }
        yield* this.generator
    }
    Evaluate(rolls: number[]): Result {
        const { tier, filter } = this.GetConfig()
        const target = this.GetTarget()
        if (!this.modifiers) {
            throw new Error("Optimizer initialized incorrectly (no modifiers created)")
        }
        const mods = this.modifiers
        rolls.forEach((rolls, i) => (
            mods[i].SetValue(rolls * scaling.GetSubstatValue(5, mods[i].GetProp(), tier))
        ))

        const subs: number[] = []
        const optimized: number[] = []
        mods.forEach(mod => {
            const stat = mod.GetProp()
            subs.push(target.GetCharacter().Get(stat))
            optimized.push(stat)
        })
        const basic = [
            target.GetCharacter().Get(stats.stat.ATK),
            target.GetCharacter().Get(stats.stat.DEF),
            target.GetCharacter().Get(stats.stat.HP),
        ]

        if (filter) {
            if (!Filter(target.GetCharacter(), ...filter)) {
                return {
                    rolls,
                    stats: subs,
                    optimized,
                    damage: -1,
                    relative: 0,
                    basic,
                }
            }
        }

        const damage = this.Run()
        return {
            rolls,
            stats: subs,
            optimized,
            damage,
            relative: damage / this.initDamage,
            basic
        }
    }
    Insert(result: Result): void {
        if (result.damage >= 0) {
            this.queue.Push(result, result.damage)
        }
    }
    Get(): Result[] {
        return this.queue.Extract()
    }

    Format(results: Result[]): Table {
        const config = this.GetConfig()
        const ls = config.substats
            .map(({ stat }) => stats.stat.Name(stat))

        const table = new Table(
            stats.stat.Name(stats.stat.ATK),
            stats.stat.Name(stats.stat.DEF),
            stats.stat.Name(stats.stat.HP),
            ...ls,
            strings.labels.DAMAGE,
            strings.labels.RELATIVE
        )

        for (const row of results) {
            const info: string[] = []
            row.stats.forEach((value, i) => {
                const flat = stats.FlatStats.includes(config.substats[i].stat)
                const s = flat ? toPlaces(value, 0) : toPlaces(value * 100, 2) + "%"
                info.push(s + ` (${row.rolls[i]})`)
            })
            const basic = row.basic.map(s => toPlaces(s, 0))
            table.AddRow(...basic, ...info, toPlaces(row.damage, 0), toPlaces(row.relative * 100, 2) + "%")
        }

        return table
    }
    /** creates a cmd string to equip a result, in the form:
     * ```
     * artifact rolls tier
     * artifact rolls equip STAT1 ROLLS STAT2 ROLLS ...
     * ```
     */
    EquipCmd(result: Result): string {
        const config = this.GetConfig()
        let cmd =
            "artifact add\n" +
            "artifact fill\n" +
            "artifact stars 5\n" +
            "artifact rolls tier " + config.tier + "\n"
        cmd += "artifact rolls equip " + result.rolls
            .map((n, i) => ({
                rolls: n,
                stat: config.substats[i].stat
            }))
            .reduce((a, b) => a + stats.stat.Name(b.stat) + " " + b.rolls + " ", "")
        return cmd
    }

    /** Disables all the modifiers used by the optimizer */
    Clear() {
        this.modifiers?.forEach(mod => mod.Disable())
    }
}