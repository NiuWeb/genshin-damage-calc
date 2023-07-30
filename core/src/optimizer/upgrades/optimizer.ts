import { Table } from "@src/strings/table"
import { Optimizer } from "../optimizer"
import { ResourceCmd } from "./resources/cmd"
import { Config, Result, Row } from "./type"
import { GetUpgrades } from "./upgrades/available"
import { UpgradeData } from "./upgrades/upgrades"

export class UpgradesOptimizer extends Optimizer<Row, Result, Config, number> {
    public override MAX_CHUNK_SIZE = 1

    private available: UpgradeData[] = []

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

    override SendMessage = () => {
        return 2
    }

    *Generate(): Generator<Row, any, unknown> {
    }
    Evaluate(row: Row): Result {
        throw new Error("Method not implemented.")
    }
    Insert(result: Result): void {
        throw new Error("Method not implemented.")
    }
    Get(): Result[] {
        throw new Error("Method not implemented.")
    }
    Format(results: Result[]): Table {
        throw new Error("Method not implemented.")
    }
}