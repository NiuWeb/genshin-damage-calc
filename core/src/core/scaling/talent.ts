import type { Instance } from "@core/instance/instance"
import type { TalentScaling } from "./talent_data"
import { stat } from "@core/stats"
import { Observer } from "@core/subject"

/** 
 * Adds a talent scaling to a damage instance
 * Returns the observers created to keep the instance updated with the talent scaling
 */
export function AddTalentScaling(instance: Instance, scaling: TalentScaling): Observer[] {
    const observers: Observer[] = []

    const mv = instance.Base.CreateMv(scaling.Stat, 0)
    const updater = () => {
        let index = instance.Get(scaling.Talent)
        if (index < 1) {
            index = 1
        } else if (index > 15) {
            index = 15
        }
        mv.Value = scaling.Initial * scaling.Scaling[index - 1]
    }
    updater()
    const char = instance.Character
    observers.push(char.CreateObserver(scaling.Talent, updater))
    switch (scaling.Talent) {
        case stat.NORMAL_ATTACK_LEVEL:
            observers.push(char.CreateObserver(stat.NORMAL_ATTACK_LEVEL_UP, updater))
            break
        case stat.ELEMENTAL_SKILL_LEVEL:
            observers.push(char.CreateObserver(stat.ELEMENTAL_SKILL_LEVEL_UP, updater))
            break
        case stat.ELEMENTAL_BURST_LEVEL:
            observers.push(char.CreateObserver(stat.ELEMENTAL_BURST_LEVEL_UP, updater))
            break
    }
    return observers
}