import { charbox } from "@src/core"
import { Table } from "@src/strings/table"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Optimizer } from "../optimizer"
import { FindCost } from "./cost/find"
import { CostList } from "./cost/type"
import { Criteria, CriteriaValues } from "./criteria"
import { ResourceCmd } from "./resources/cmd"
import { Config, Curve, Result, Row } from "./type"
import { GetUpgrades } from "./upgrades/available"
import { EquipUpgrade } from "./upgrades/equip"
import { UpgradeData } from "./upgrades/upgrades"

export class UpgradesOptimizer extends Optimizer<Row[], Result[], Config> {
    private queue = new PriorityQueue<Result>()

    private initDamage = 0
    private prevDamage = 0

    private costs: { [stars: number]: CostList } = {}
    private criteria = Criteria.damage

    private result: Result[][] = []

    protected init(config: Config): void {
        if (!config.costs) {
            const resourceCmd = new ResourceCmd()
            resourceCmd.compileString(config.resourceCmd)()
            config.costs = resourceCmd.CalculateCost()
        }

        this.prevDamage = this.initDamage = this.Run()
        this.costs = config.costs
        this.criteria = Criteria[config.criteria]
    }

    *Generate() {
        let upgrades: UpgradeData[]
        do {
            upgrades = this.getUpgrades()

            const rows = upgrades.map(upgrade => ({
                step: "upgrade",
                upgrade,
                cmd: EquipUpgrade(upgrade)
            } as Row))

            yield rows

        } while (upgrades.length > 0)
    }

    /**
     * gets the current available upgrades on the party
     */
    private getUpgrades(): UpgradeData[] {
        const result: UpgradeData[] = []
        const party = this.GetParty()
        const members = party.GetMembers()

        for (const member of members) {
            const available = GetUpgrades(member)
            result.push(...available)
        }

        return result
    }

    private evaluateRow(row: Row): Result {
        const party = this.GetParty()
        const state = charbox.ExportParty(party)

        const runner = this.GetRunner()
        runner.compileString(row.cmd)()
        const damage = this.Run()
        const increase = damage / this.prevDamage - 1
        charbox.ImportParty(state, party)

        const cost = FindCost(this.costs[row.upgrade.stars], row.upgrade)
        const criteriaValues: CriteriaValues = {} as CriteriaValues
        for (const [name, criteria] of Object.entries(Criteria)) {
            criteriaValues[name as Criteria] = criteria.fn(cost, damage, increase)
        }

        return {
            criteria: this.GetConfig().criteria,
            ...criteriaValues,
            cmd: row.cmd,
            costData: cost,
            upgrade: row.upgrade,
            relative: damage / this.initDamage,
            increase
        }
    }

    Evaluate(rows: Row[]): Result[] {
        this.queue.Extract()

        for (const row of rows) {
            const result = this.evaluateRow(row)
            const value = result[this.GetConfig().criteria] * (
                this.criteria.criteria === "max" ? 1 : -1
            )
            this.queue.Push(result, value)
        }

        const sorted = this.queue.Extract()

        return sorted
    }
    Insert(result: Result[]): void {
        const decided = result[0]
        if (decided) { // equip the decided upgrade
            const runner = this.GetRunner()
            runner.compileString(decided.cmd)()
            this.prevDamage = this.Run()
            decided.selected = true
        }
        if (result.length > 1) {
            result = result.filter((result, i) => i === 0 || result.increase > 1e-12)
        }
        this.result.push(result)
    }
    Get(): Result[][] {
        return this.result
    }
    Format(): Table {
        throw new Error("Method not implemented.")
    }

    /**
     * Transforms a table of results into a x,y curve,
     * where one axis is the accumulated cost and the
     * other is the total damage.
     * @param table the table of results
     * @returns a curve of the results
     */
    static Curve(table: Result[][]): Curve {
        const curve: Curve = []
        let cost = 0

        if (table[0] && table[0][0]) {
            const first = table[0][0]
            curve.push([0, first.damage / (1 + first.increase)])
        }

        for (const [first] of table) {
            if (!first) continue
            const costData = first.costData

            cost += costData.cost

            curve.push([cost, first.damage])
        }

        return curve
    }

    override EquipCmd(): string {
        throw new Error("Method not implemented.")
    }
}