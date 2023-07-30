import { charbox } from "@src/core"
import { Table } from "@src/strings/table"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Optimizer } from "../optimizer"
import { FindCost } from "./cost/find"
import { CostList } from "./cost/type"
import { Criteria, CriteriaValues } from "./criteria"
import { ResourceCmd } from "./resources/cmd"
import { Config, Result, Row } from "./type"
import { GetUpgrades } from "./upgrades/available"
import { EquipUpgrade } from "./upgrades/equip"
import { UpgradeData } from "./upgrades/upgrades"

export class UpgradesOptimizer extends Optimizer<Row, Result, Config, Row | undefined, Result[][]> {
    public override TRANSFORM = true
    public override MAX_CHUNK_SIZE = 1
    public override MAX_CHILDREN = 1

    private queue = new PriorityQueue<Result>()

    private levelCount = 0
    private initDamage = 0
    private prevDamage = 0

    private costs: { [stars: number]: CostList } = {}
    private criteria = Criteria.damage

    private result: Result[][] = []

    protected init(config: Config): void {
        if (!config.costs) {
            const resourceCmd = new ResourceCmd()
            resourceCmd.Program.CompileString(config.resourceCmd)()
            config.costs = resourceCmd.CalculateCost()
        }

        this.prevDamage = this.initDamage = this.Run()
        this.costs = config.costs
        this.criteria = Criteria[config.criteria]
    }

    /**
     * gets the current available upgrades
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

    // messages are sent for all children to select
    // the optimal upgrade each run. A run ends
    // when all the currently available upgrades
    // have been evaluated.

    override SendMessage = () => {
        if (this.queue.Length() < this.levelCount) {
            return undefined
        }
        const result = this.queue.Extract()
        this.result.push(result)

        const top = result[0]
        top.selected = true

        return {
            step: "upgrade",
            upgrade: top.upgrade,
            cmd: EquipUpgrade(top.upgrade),
            damage: top.damage
        } as Row
    }

    // When a message is recieved, the optimizer
    // will equip the upgrade to change its
    // state to the next upgrade. 
    override RecieveMessage(msg: Row | undefined): void {
        if (!msg || msg.step !== "upgrade" || !msg.damage) { return }
        const cmd = EquipUpgrade(msg.upgrade)
        const runner = this.GetRunner()
        runner.Program.CompileString(cmd)()
        this.prevDamage = msg.damage
    }

    // Keep generating upgrades until there are no more
    // upgrades available.

    *Generate() {
        let upgrades: UpgradeData[]
        do {
            upgrades = this.getUpgrades()
            this.levelCount = upgrades.length

            for (const upgrade of upgrades) {
                yield {
                    step: "evaluate",
                    upgrade,
                    cmd: EquipUpgrade(upgrade)
                } as Row
            }
        } while (upgrades.length > 0)
    }

    Evaluate(row: Row): Result {
        const party = this.GetParty()
        const state = charbox.ExportParty(party)

        const runner = this.GetRunner()
        runner.Program.CompileString(row.cmd)()
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

    Insert(result: Result): void {
        const value = result[this.GetConfig().criteria] * (
            this.criteria.criteria === "max" ? 1 : -1
        )

        this.queue.Push(result, value)
    }
    Get(): Result[] {
        return this.queue.Extract()
    }

    override Transform(): Result[][] {
        return this.result
            // remove empty or non-increasing rows
            .filter(row => row.length > 0 && row[0].increase > 1e-6)
            // remove duplicates inside each row
            .map(row => row.filter((value, i, arr) => {
                // remove values with no increase
                if (value.increase < 1e-6) return false
                // two values are equal if they have the same cmd
                const found = arr.findIndex(v => v.cmd === value.cmd)
                // if the value index isn't the same as the first
                // coincidence of the same cmd, then it's a duplicate
                return found === i
            }))
    }
    Format(): Table {
        throw new Error("Method not implemented.")
    }
}