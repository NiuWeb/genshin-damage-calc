import { stat } from "@core/stats"
import { Observer } from "../subject"
import { Enemy } from "./enemy"
import { EnemyEvent } from "./events"
import { Export, Exported, Import } from "./loader"

/**
 * Connects multiple enemies so when level, auras or base RES
 * of an enemy is changed, the change propagates to all the other enemies 
 */
export class EnemyConnector {
    constructor(...members: Enemy[]) {
        members.forEach(memb => this.Add(memb))
    }
    private members = new Set<Enemy>()
    private observers = new Map<Enemy, Observer[]>()
    private updating = false
    private state?: Exported

    /** triggers when a property is changed on any enemy */
    private onChange(target: Enemy): void {
        // avoid recursive method triggering
        if (this.updating) {
            return
        }
        const state = this.state = Export(target)
        this.updating = true
        for (const member of this.members) {
            if (member === target) { continue } // do not re-update the same updated enemy
            Import(state, member)
        }
        this.updating = false
    }

    /** 
     * Adds an enemy to the connection: any change on the
     * provided enemy will affect all the other added enemies,
     * and viceversa.
     */
    Add(member: Enemy): boolean {
        if (this.members.has(member)) {
            return false
        }

        const first = this.members.size === 0
        this.members.add(member)
        if (!first && this.state) {
            Import(this.state, member)
        }

        const trigger = () => this.onChange(member)
        this.observers.set(member, [
            member.Subject.CreateObserver(stat.LEVEL, trigger),
            member.Event.CreateObserver(EnemyEvent.CHANGE_AURA, trigger),
            member.Event.CreateObserver(EnemyEvent.CHANGE_BASE_RES, trigger)
        ])

        return true
    }

    /** 
     * Removes an enemy from the connection. It will free it
     * from update other enemies on changes and viceversa
     */
    Remove(member: Enemy): void {
        this.members.delete(member)
        const observers = this.observers.get(member)
        if (!observers) { return }
        observers.forEach(obs => obs.Remove())
        this.observers.delete(member)
    }
}