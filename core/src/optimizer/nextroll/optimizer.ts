import { scaling, stats } from "@src/core"
import { Modifier } from "@src/core/subject"
import { strings } from "@src/strings"
import { Table } from "@src/strings/table"
import { toPlaces } from "@src/utils/numbers"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Optimizer } from "../optimizer"
import { Config, Result, Row } from "./type"

const allStats = Array.from(new Set([
    ...stats.Substats,
    ...stats.Elements,
    stats.stat.HEALING_BONUS,
]).values())

export class NextRollOptimizer extends Optimizer<Row, Result, Config> {
    private modifiers: { [stat: number]: Modifier } = {}
    private queue = new PriorityQueue<Result>()

    protected init(): void {
        const target = this.GetTarget()
        allStats.forEach(stat => (
            this.modifiers[stat] = target.GetCharacter().CreateModifier(stat, 0)
        ))
        this.setTotal(allStats.length)
    }
    *Generate() {
        for (const stat of allStats) {
            yield stat
        }
    }
    Evaluate(stat: Row): Result {
        const config = this.GetConfig()
        const value = scaling.GetSubstatValue(5, stat, config.tier)

        if (!this.modifiers) {
            throw new Error("No modifiers has been initialized. Try to run `.Init()` first.")
        }
        const mod = this.modifiers[stat]

        // previous state
        mod.SetValue(0)
        const prev = this.Run()

        // next state
        mod.SetValue(value)
        const next = this.Run()

        // reset
        mod.SetValue(0)

        return { stat, damage: next, benefit: next / prev - 1 }
    }
    Insert(result: Result): void {
        this.queue.Push(result, result.benefit)
    }
    Get(): Result[] {
        return this.queue.Extract()
    }
    Format(results: Result[]): Table {
        const config = this.GetConfig()
        const table = new strings.Table(
            strings.labels.STAT,
            strings.labels.VALUE,
            strings.labels.DAMAGE,
            strings.labels.BENEFIT
        )
        for (const { stat, damage, benefit } of results) {
            const value = stats.FlatStats.includes(stat) ?
                toPlaces(scaling.GetSubstatValue(5, stat, config.tier), 0) :
                toPlaces(scaling.GetSubstatValue(5, stat, config.tier) * 100, 2)

            table.AddRow(stats.stat.Name(stat), value, toPlaces(damage, 2), toPlaces(benefit * 100, 4) + "%")
        }
        return table
    }

    override EquipCmd(): string {
        throw new Error("Method not implemented.")
    }

}