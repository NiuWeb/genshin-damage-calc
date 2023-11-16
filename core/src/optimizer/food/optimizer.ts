import { food } from "@src/core"
import { foods } from "@src/resources"
import { Table } from "@src/strings/table"
import { CombinateArrays } from "@src/utils/combinations/arrays"
import { toPlaces } from "@src/utils/numbers"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Optimizer } from "../optimizer"
import { OptimizerConfig } from "../type"
import { Result, Row } from "./type"

export class FoodOptimizer extends Optimizer<Row, Result, OptimizerConfig> {
    private initDamage = 0
    private queue = new PriorityQueue<Result>()
    private groups: string[][] = []
    protected init(): void {
        this.initDamage = this.Run()

        for (const type of [food.FoodType.OFFENSIVE, food.FoodType.ELEMENTAL, food.FoodType.DEFENSIVE]) {
            const list = foods.GetByType(type)
            this.groups.push(list.map(f => f.Name))
        }
        this.setTotal(this.groups.reduce((a, b) => a * b.length, 1))
    }
    Generate() {
        return CombinateArrays(...this.groups)
    }
    Evaluate(foods: Row): Result {
        const runner = this.GetRunner()
        const cmd = foods.map(name => (
            "food add " + name + " 3"
        )).join("\n")

        runner.compileString(cmd)()

        const damage = this.Run()

        return {
            foods,
            cmd,
            damage,
            relative: damage / this.initDamage,
        }
    }
    Insert(result: Result): void {
        this.queue.Push(result, result.damage)
    }
    Get(): Result[] {
        return this.queue.Extract()
    }
    Format(results: Result[]): Table {
        const table = new Table("FOOD_TYPE_0", "FOOD_TYPE_3", "FOOD_TYPE_1", "DAMAGE", "RELATIVE")
        for (const result of results) {
            table.AddRow(
                ...result.foods,
                toPlaces(result.damage, 0),
                toPlaces(result.relative * 100, 2) + "%",
            )
        }
        return table
    }

}