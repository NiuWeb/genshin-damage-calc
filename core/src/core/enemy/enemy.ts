import { Elements, stat } from "@core/stats"
import { AuraToDmg, DmgToRes } from "@core/stats/conversions"
import { Modifier, Subject } from "@core/subject"
import { EnemyEvent } from "./events"

/**
 * Enemy that recieves damage
 */
export class Enemy {
    constructor(public readonly name?: string) {
        this.baseMods = Elements.map(element => (
            this.Subject.CreateModifier(DmgToRes(element), 0.1)
        ))
        this.SetLevel(90)
    }
    private readonly baseMods: Modifier[]
    /**
     * Subject for events
     */
    readonly Event = new Subject(EnemyEvent.Length(), "ENEMY_EVENT")
    /**
     * Subject for stats
     */
    readonly Subject = new Subject(stat.Length(), "ENEMY_STATS")
    /**
     * Applied auras
     */
    private auras: readonly number[] = []

    /**
     * Gets the enemy level
     */
    GetLevel(): number {
        return this.Subject.Get(stat.LEVEL)
    }
    /**
     * Sets the enemy level
     */
    SetLevel(level: number): Enemy {
        this.Subject.Set(stat.LEVEL, level)
        return this
    }
    /**
     * Checks if the enemy is affected by a given element
     */
    Affected(element: number): boolean {
        for (const aura of this.auras) {
            const el = AuraToDmg(aura)
            if (el === element) {
                return true
            }
        }
        return false
    }
    /**
     * Checks if the enemy has the given aura
     */
    HasAura(aura: number): boolean {
        return this.auras.includes(aura)
    }
    /**
     * Sets the auras applied to the enemy
     */
    SetAuras(...auras: readonly number[]): Enemy {
        this.auras = auras
        this.Event.Notify(EnemyEvent.CHANGE_AURA)
        return this
    }
    /**
     * Gets the auras applied to the enemy
     */
    GetAuras(): readonly number[] {
        return this.auras
    }

    /**
     * Gets the value of the given Base RES of the enemy.
     * Throws an error if the provided stat is not a valid RES.
     */
    GetBaseRes(res: number): number {
        const mod = this.baseMods.find(mod => mod.GetProp() === res)
        if (!mod) {
            throw new Error(`Cannot find the given RES: ${res}`)
        }
        return mod.GetValue()
    }
    /**
     * Sets the value of the given Base RES of the enemy.
     * Throws an error if the provided stat is not a valid RES.
     */
    SetBaseRes(res: number, value: number): Enemy {
        const mod = this.baseMods.find(mod => mod.GetProp() === res)
        if (!mod) {
            throw new Error(`Cannot find the given RES: ${res}`)
        }
        mod.SetValue(value)
        this.Event.Notify(EnemyEvent.CHANGE_BASE_RES)
        return this
    }
}