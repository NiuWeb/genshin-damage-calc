import { stat as stats } from "@core/stats"
import { Subject } from "@core/subject"
import { getMinAscension, getMaxAscension } from "@src/utils/ascension"

/**
 * Sets the value of a character stats. Total stats (ATK, HP, DEF) cannot
 * be set directly and will panic if passed as argument.
 */
export function statSet(subject: Subject, stat: number, value: number): void {
    let lv: number,
        min: number,
        max: number,
        asc: number

    switch (stat) {
        case stats.ATK:
            throw new Error("Cannot set Total ATK directly.")
        case stats.HP:
            throw new Error("Cannot set Total HP directly.")
        case stats.DEF:
            throw new Error("Cannot set Total DEF directly")

        case stats.NORMAL_ATTACK_LEVEL: {
            const up = subject.Get(stats.NORMAL_ATTACK_LEVEL_UP)
            value = Math.max(1 + up, Math.floor(value))
            subject.Set(stats.NORMAL_ATTACK_LEVEL, value - up)
            break
        }
        case stats.ELEMENTAL_SKILL_LEVEL: {
            const up = subject.Get(stats.ELEMENTAL_SKILL_LEVEL_UP)
            value = Math.max(1 + up, Math.floor(value))
            subject.Set(stats.ELEMENTAL_SKILL_LEVEL, value - up)
            break
        }
        case stats.ELEMENTAL_BURST_LEVEL: {
            const up = subject.Get(stats.ELEMENTAL_BURST_LEVEL_UP)
            value = Math.max(1 + up, Math.floor(value))
            subject.Set(stats.ELEMENTAL_BURST_LEVEL, value - up)
            break
        }
        case stats.LEVEL:
            if (value > 90) {
                value = 90
            } else if (value < 1) {
                value = 1
            }
            value = Math.floor(value)
            min = getMinAscension(value)
            max = getMaxAscension(value)
            asc = subject.Get(stats.ASCENSION)
            if (asc < min) {
                asc = min
            } else if (asc > max) {
                asc = max
            }
            subject.Set(stats.ASCENSION, asc)
            subject.Set(stats.LEVEL, value)
            break

        case stats.ASCENSION:
            lv = subject.Get(stats.LEVEL)
            min = getMinAscension(lv)
            max = getMaxAscension(lv)
            asc = Math.floor(value)
            if (asc < min) {
                asc = min
            } else if (asc > max) {
                asc = max
            }
            subject.Set(stats.ASCENSION, asc)
            break

        case stats.HP_CURRENT:
        case stats.ENERGY_CURRENT:
            value = Math.max(0, Math.min(1, value))
            subject.Set(stat, value)
            break

        default:
            subject.Set(stat, value)
            break
    }
}