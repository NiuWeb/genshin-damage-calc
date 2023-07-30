import { charbox } from "@src/core"
import { Table } from "@src/strings/table"
import { PriorityQueue } from "@src/utils/priority/queue"
import { GetThreadType, THREAD_TYPE } from "@src/worker/actions/optimizer/config"
import { Optimizer } from "../optimizer"
import { ResourceCmd } from "./resources/cmd"
import { Config, Result, Row } from "./type"
import { GetUpgrades } from "./upgrades/available"
import { EquipUpgrade } from "./upgrades/equip"
import { UpgradeData } from "./upgrades/upgrades"

export class UpgradesOptimizer extends Optimizer<Row, Result, Config, Row | undefined> {
    public override MAX_CHUNK_SIZE = 1

    private queue = new PriorityQueue<Result>()

    private id = 0
    private prevId = this.id
    private initDamage = 0

    protected init(config: Config): void {
        if (!config.costs) {
            const resourceCmd = new ResourceCmd()
            resourceCmd.Program.CompileString(config.resourceCmd)()
            config.costs = resourceCmd.CalculateCost()
        }

        this.initDamage = this.Run()
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
        if (this.prevId === this.id) {
            return undefined
        }
        this.prevId = this.id

        const [res] = this.queue.Top()

        console.warn("selected upgrade is: ", EquipUpgrade(res.upgrade))

        return {
            id: this.id,
            step: "upgrade",
            upgrade: res.upgrade
        } as Row
    }

    override RecieveMessage(msg: Row | undefined): void {
        if (!msg || msg.step !== "upgrade") { return }
        const cmd = EquipUpgrade(msg.upgrade)
        const runner = this.GetRunner()
        runner.Program.CompileString(cmd)()
        if (GetThreadType() === THREAD_TYPE.MAIN_WORKER) {
            console.log(">>recieving from main worker", cmd)
        } else {
            console.log("<<recieving from child worker", cmd)
        }
    }

    *Generate() {
        let upgrades: UpgradeData[]
        do {
            upgrades = this.getUpgrades()
            for (const upgrade of upgrades) {
                console.log("evaluated upgrade is: ", EquipUpgrade(upgrade))
                yield {
                    id: this.id,
                    step: "evaluate",
                    upgrade
                } as Row
            }
            this.id++
        } while (upgrades.length > 0)
    }
    Evaluate(row: Row): Result {
        const party = this.GetParty()
        const state = charbox.ExportParty(party)

        const runner = this.GetRunner()
        runner.Program.CompileString(EquipUpgrade(row.upgrade))()
        const damage = this.Run()

        charbox.ImportParty(state, party)

        return {
            upgrade: row.upgrade,
            damage,
            relative: damage / this.initDamage
        }
    }
    Insert(result: Result): void {
        this.queue.Push(result, result.damage)
    }
    Get(): Result[] {
        return this.queue.Extract()
    }
    Format(): Table {
        throw new Error("Method not implemented.")
    }
}