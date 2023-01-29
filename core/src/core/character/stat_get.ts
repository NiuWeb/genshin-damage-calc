import { TotalStat } from "@core/formula"
import { stat as stats } from "@core/stats"
import { Subject } from "@core/subject"

/** 
 * Gets the computed value of a character stat 
 */
export function statGet(subject: Subject, stat: number): number {
    switch (stat) {
        case stats.ATK:
            return TotalStat(
                subject.Get(stats.ATK_BASE),
                subject.Get(stats.ATK_PERCENT),
                subject.Get(stats.ATK_FLAT),
            )
        case stats.HP:
            return TotalStat(
                subject.Get(stats.HP_BASE),
                subject.Get(stats.HP_PERCENT),
                subject.Get(stats.HP_FLAT),
            )
        case stats.DEF:
            return TotalStat(
                subject.Get(stats.DEF_BASE),
                subject.Get(stats.DEF_PERCENT),
                subject.Get(stats.DEF_FLAT),
            )

        case stats.NORMAL_ATTACK_LEVEL:
            return subject.Get(stats.NORMAL_ATTACK_LEVEL) +
                subject.Get(stats.NORMAL_ATTACK_LEVEL_UP)

        case stats.ELEMENTAL_SKILL_LEVEL:
            return subject.Get(stats.ELEMENTAL_SKILL_LEVEL) +
                subject.Get(stats.ELEMENTAL_SKILL_LEVEL_UP)

        case stats.ELEMENTAL_BURST_LEVEL:
            return subject.Get(stats.ELEMENTAL_BURST_LEVEL) +
                subject.Get(stats.ELEMENTAL_BURST_LEVEL_UP)

        case stats.CHARGED_AIMED_SHOT_DMG:
            return subject.Get(stats.CHARGED_AIMED_SHOT_DMG) +
                subject.Get(stats.CHARGED_ATTACK_DMG) +
                subject.Get(stats.AIMED_SHOT_DMG)

        case stats.CHARGED_AIMED_SHOT_ATK_FLAT:
            return subject.Get(stats.CHARGED_AIMED_SHOT_ATK_FLAT) +
                subject.Get(stats.CHARGED_ATTACK_ATK_FLAT) +
                subject.Get(stats.AIMED_SHOT_ATK_FLAT)

        case stats.CHARGED_AIMED_SHOT_ATK_PERCENT:
            return subject.Get(stats.CHARGED_AIMED_SHOT_ATK_PERCENT) +
                subject.Get(stats.CHARGED_ATTACK_ATK_PERCENT) +
                subject.Get(stats.AIMED_SHOT_ATK_PERCENT)

        case stats.CHARGED_AIMED_SHOT_CRIT_DMG:
            return subject.Get(stats.CHARGED_AIMED_SHOT_CRIT_DMG) +
                subject.Get(stats.CHARGED_ATTACK_CRIT_DMG) +
                subject.Get(stats.AIMED_SHOT_CRIT_DMG)

        case stats.CHARGED_AIMED_SHOT_CRIT_RATE:
            return subject.Get(stats.CHARGED_AIMED_SHOT_CRIT_RATE) +
                subject.Get(stats.CHARGED_ATTACK_CRIT_RATE) +
                subject.Get(stats.AIMED_SHOT_CRIT_RATE)

        case stats.CHARGED_AIMED_SHOT_DMG_FLAT:
            return subject.Get(stats.CHARGED_AIMED_SHOT_DMG_FLAT) +
                subject.Get(stats.CHARGED_ATTACK_DMG_FLAT) +
                subject.Get(stats.AIMED_SHOT_DMG_FLAT)

        default:
            return subject.Get(stat)
    }
}
