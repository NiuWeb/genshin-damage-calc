import { Constants, SplitCases } from "@src/cmd2"
import { artifact, effect } from "@src/core"
import { effects, sets } from "@src/resources"
import { strings } from "@src/strings"
import { Table } from "@src/strings/table"
import { toPlaces } from "@src/utils/numbers"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Optimizer } from "../optimizer"
import { CombinateEffects } from "../utils/effects"
import { Config, Result, Row } from "./type"

const allSets = sets.GetList()

export class SetOptimizer extends Optimizer<Row, Result, Config> {
    private cases = new Map<string, string[]>()
    private combinations: Row[] = []
    private constants: Constants = {}
    private initDamage = 0
    private initState?: artifact.Exported[]
    private queue = new PriorityQueue<Result>()

    protected init(config: Config): void {
        this.Combinate(config)
        this.setTotal(this.combinations.length)

        this.constants = this.getConstants()
        this.initDamage = this.Run()

        const target = this.GetTarget()
        const artifacts = target.GetArtifacts()
        if (!artifacts) {
            throw new Error("Target character has no artifacts to be optimized")
        }
        this.initState = artifacts.GetArtifacts().map(s => artifact.Export(s))
    }
    /** generates all the set combinations */
    public Combinate(config: Config) {
        if (config.ConfigCmd) {
            this.cases = SplitCases(config.ConfigCmd)
        }
        this.combinations = []
        for (let i = 0; i < allSets.length; i++) {
            for (let j = i; j < allSets.length; j++) {
                const combi = [allSets[i], allSets[j]]
                    .sort((a, b) => a.Stars - b.Stars)
                this.combinations.push(...this.createRows(combi[0], combi[1]))
            }
        }
    }

    /**
     * Creates all the needed combinations to evaluate a single pair of sets.
     * By default, it will be added a combination for 0 stacks, max stacks
     * and the middle stacks, combinated with all the possible effect conditions.
     * Custom config code will override this.
     * @param set1 2-piece set
     * @param set2 2-piece or 4-piece set
     * @returns created combinations
     */
    private createRows(info1: artifact.Set, info2: artifact.Set): Row[] {
        const effects = (() => {
            if (info1 === info2) { // for 4-piece sets
                return [...info1.Piece2, ...info1.Piece4]
            }
            // for 2-piece sets
            return [...info1.Piece2, ...info2.Piece2]
        })()

        const configCombinations = CombinateEffects(effects, this.cases)
        const rows: Row[] = []
        for (const cmds of configCombinations) {
            const row: Row = {
                sets: [info1.Name, info2.Name],
                cmds
            }
            rows.push(row)
        }
        return rows
    }

    *Generate() {
        for (const row of this.combinations) {
            yield row
        }
    }
    Evaluate(row: Row): Result {
        const runner = this.GetRunner()
        const target = this.GetTarget()
        const artifacts = target.GetArtifacts()
        if (!artifacts) {
            throw new Error("Target character has no artifacts to be optimized")
        }
        const [set1, set2] = row.sets
        const info1 = sets.FindByName(set1)
        const info2 = sets.FindByName(set2)

        // equip the set
        artifacts.Get(0).SetSet(set1)
        artifacts.Get(1).SetSet(set1)
        artifacts.Get(2).SetSet(set2)
        artifacts.Get(3).SetSet(set2)

        // transform artifacts if used 4-star sets
        const transform = new Set<number>()
        if (info1 && info1.Stars === 4) {
            transform.add(0)
            transform.add(1)
        }
        if (info2 && info2.Stars === 4) {
            transform.add(2)
            transform.add(3)
        }

        for (const i of transform) {
            artifact.transform.Downgrade(artifacts.Get(i))
        }

        const result: Result = {
            sets: [set1, set2],
            states: [],
            damage: 0,
            relative: 0
        }

        // configure all set effects
        for (const ef of artifacts.GetEffects()) {
            const name = ef.Options.Name
            runner.Scenario.Effect = ef
            const config = row.cmds[name]
            if (!config) { continue }

            let str = ""
            for (const cmd of config) {
                const fn = runner.Program.CompileString(cmd, { constants: this.constants })
                fn()
                str += fn.String() + "\n"
            }

            result.states.push({
                state: effect.Export(ef),
                cmd: "effect set " + name + "\n" + str,
                effect: name,
            })
        }

        const damage = this.Run()
        result.damage = damage
        result.relative = damage / this.initDamage

        // if any 4-star set has been used,
        // restore artifacts to its initial state
        if (this.initState && transform.size > 0) {
            const state = this.initState
            artifacts.GetArtifacts().forEach((a, i) => artifact.Import(state[i], a))
        }

        return result
    }
    Insert(result: Result): void {
        this.queue.Push(result, result.damage)
    }
    Get(): Result[] {
        return this.queue.Extract()
    }
    Format(results: Result[]): Table {
        const table = new strings.Table(
            strings.labels.SET,
            strings.labels.SET,
            strings.labels.STACKS,
            strings.labels.CONDITION,
            strings.labels.DAMAGE,
            strings.labels.RELATIVE
        )

        for (const row of results) {
            let [set1, set2] = row.sets
            if (set1 === set2) {
                set1 += " (2)"
                set2 += " (4)"
            } else {
                set1 += " (2)"
                set2 += " (2)"
            }
            const stacks = row.states
                .map(({ state, effect }) => {
                    const ef = effects.FindByName(effect)
                    if (!ef) { return "" }
                    if ((ef.MaxStacks || 0) > 0) {
                        return state.stacks + ""
                    }
                    return ""
                })
                .filter(s => !!s)
                .join(", ")


            const conditions = row.states
                .map(({ state }) => [...state.conditions])
                .reduce((a, b) => {
                    b.forEach(b => a.push(b))
                    return a
                }, [])
                .filter(s => !!s)
                .join(", ")
            table.AddRow(set1, set2, stacks, conditions, row.damage, toPlaces(row.relative * 100, 2) + "%")
        }

        return table
    }

    EquipCmd(result: Result): string {
        let command =
            "artifact add\n" +
            "artifact sets " + result.sets.join(" ") + "\n"

        const [set1, set2] = result.sets
        const info1 = sets.FindByName(set1)
        const info2 = sets.FindByName(set2)

        const transform = new Set<string>()
        if (info1 && info1.Stars === 4) {
            transform.add("flower")
            transform.add("plume")
        }
        if (info2 && info2.Stars === 4) {
            transform.add("sands")
            transform.add("goblet")
        }
        for (const t of transform) {
            command += t + " downgrade\n"
        }

        for (const { cmd } of result.states) {
            command += cmd + "\n\n"
        }
        command += "effect unset"
        return command
    }
}