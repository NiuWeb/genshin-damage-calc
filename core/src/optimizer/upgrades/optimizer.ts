import { Table } from "@src/strings/table"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Optimizer } from "../optimizer"
import { ResourceCmd } from "./resources/cmd"
import { Config, Result, Row } from "./type"
import { GetUpgrades } from "./upgrades/available"
import { EquipUpgrade } from "./upgrades/equip"
import { UpgradeData } from "./upgrades/upgrades"

export class UpgradesOptimizer extends Optimizer<Row, Result, Config, Row | undefined> {
    public override MAX_CHUNK_SIZE = 1

    private available: UpgradeData[] = []
    private queue = new PriorityQueue<Result>()

    protected init(config: Config): void {
        if (!config.costs) {
            const resourceCmd = new ResourceCmd()
            resourceCmd.Program.CompileString(config.resourceCmd)()
            config.costs = resourceCmd.CalculateCost()
        }

        this.getUpgrades()
    }

    /**
     * gets the current available upgrades
     */
    private getUpgrades() {
        const party = this.GetParty()
        const members = party.GetMembers()

        for (const member of members) {
            const available = GetUpgrades(member)
            this.available.push(...available)
        }
    }

    // messages are sent for all children to select
    // the optimal upgrade each run. A run ends
    // when all the currently available upgrades
    // have been evaluated.

    override SendMessage = () => {
        if (this.available.length > 0) {
            return undefined
        }
        const [res] = this.queue.Top()
        return {
            step: "upgrade",
            upgrade: res.upgrade
        } as Row
    }

    override RecieveMessage(msg: Row | undefined): void {
        if (!msg) { return }
        const cmd = EquipUpgrade(msg.upgrade)
        const runner = this.GetRunner()
        runner.Program.CompileString(cmd)()

        console.log("child worker has equiped upgrade", cmd)
    }

    *Generate() {
        for (const upgrade of this.available) {
            yield {
                step: "evaluate",
                upgrade
            } as Row
        }
        // after yielding all the available upgrades,
        // remove them from the list
        this.available = []
    }
    Evaluate(row: Row): Result {
        return {
            upgrade: row.upgrade,
            damage: 0,
            relative: 0
        }
    }
    Insert(result: Result): void {
        this.queue.Push(result, result.damage)
    }
    Get(): Result[] {
        throw new Error("Method not implemented.")
    }
    Format(): Table {
        throw new Error("Method not implemented.")
    }
}