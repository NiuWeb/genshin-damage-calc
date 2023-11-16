import { effect } from "@src/core"
import { effects, weapons } from "@src/resources"
import { strings } from "@src/strings"
import { Table } from "@src/strings/table"
import { toPlaces } from "@src/utils/numbers"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Optimizer } from "../optimizer"
import { CombinateEffects } from "../utils/effects"
import { SplitCases } from "../utils/splitcases"
import { Config, Result, Row } from "./type"

export class WeaponOptimizer extends Optimizer<Row, Result, Config> {
    private cases = new Map<string, string[]>()
    private combinations: Row[] = []
    private initDamage = 0
    private queue = new PriorityQueue<Result>()

    protected init(config: Config): void {
        this.Combinate(config)
        this.setTotal(this.combinations.length)
        const constants = this.getConstants()

        const runner = this.GetRunner()

        for (const name in constants) {
            runner.constants.set(name, constants[name])
        }

        this.initDamage = this.Run()


    }

    Combinate(config: Config) {
        if (config.ConfigCmd) {
            this.cases = SplitCases(config.ConfigCmd)
        }
        const list = (() => {
            if (config.All) {
                return weapons.GetList()
            } else {
                return weapons.GetByType(this.GetTarget().GetCharacter().Options.Weapon || 0)
            }
        })()

        this.combinations = []
        for (const wp of list) {
            const ranks = config.Ranks?.[wp.Stars] || [1]
            if (wp.Effects.length === 0) {
                for (const rank of ranks) {
                    this.combinations.push({
                        weapon: wp.Name,
                        cmds: {},
                        cmd: "weapon level 90\nweapon rank " + rank
                    })
                }

                continue
            }
            const configCombinations = CombinateEffects(wp.Effects, this.cases)
            for (const cmds of configCombinations) {
                for (const rank of ranks) {
                    const row: Row = {
                        weapon: wp.Name,
                        cmds,
                        cmd: "weapon level 90\nweapon rank " + rank
                    }
                    this.combinations.push(row)
                }
            }
        }
    }

    *Generate() {
        for (const combi of this.combinations) {
            yield combi
        }
    }

    Evaluate(row: Row): Result {
        const runner = this.GetRunner()
        const target = this.GetTarget()
        runner.Scenario.Character = target

        // remove the current weapon
        target.GetWeapon()?.Unequip()

        // equip the new weapon
        const gen = weapons.FindByName(row.weapon)
        if (!gen) {
            throw new Error("Cannot find weapon: " + row.weapon)
        }
        target.SetWeapon(gen)
        const weapon = target.GetWeapon()
        if (!weapon) {
            throw new Error("Cannot equip the weapon: " + row.weapon)
        }

        const config = runner.compileString(row.cmd)
        config()

        // configure the weapon effects
        const result: Result = {
            weapon: weapon.Options.Name,
            states: [],
            damage: 0,
            relative: 0,
            cmd: config.String(),
            rank: weapon.GetRank(),
        }
        for (const ef of weapon.GetEffects()) {
            const name = ef.Options.Name
            runner.Scenario.Effect = ef
            const config = row.cmds[name]
            if (!config) { continue }

            let str = ""
            for (const cmd of config) {
                const fn = runner.compileString(cmd)
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

        return result
    }
    Insert(result: Result): void {
        this.queue.Push(result, result.damage)
    }
    Get(): Result[] {
        return this.queue.Extract()
    }
    Format(results: Result[]): Table {
        const table = new Table(
            strings.labels.WEAPON,
            strings.labels.STACKS,
            strings.labels.CONDITION,
            strings.labels.DAMAGE,
            strings.labels.RELATIVE,
        )

        for (const row of results) {
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

            table.AddRow(
                row.weapon + ` (R${row.rank})`,
                stacks,
                conditions,
                row.damage,
                toPlaces(row.relative * 100, 2) + "%"
            )
        }

        return table
    }

    EquipCmd(result: Result): string {
        let command =
            "weapon set " + result.weapon + "\n" +
            result.cmd + "\n"
        for (const { cmd } of result.states) {
            command += cmd + "\n\n"
        }
        command += "effect unset"
        return command
    }
}