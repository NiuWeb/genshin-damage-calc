import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "ShenheA1",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 1 } })
        .stat
        .Char(stats.stat.CRYO_DMG)
        .Values(0.15)
        .Build()
})

export const a4 = effect.Factory({
    Name: "ShenheA4",
    ApplyOther: true,
    Conditions: ["PRESS", "HOLD"],
    MaxConditions: 1,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 4 }, effect: { conditions: ["PRESS"] } })
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_DMG, stats.stat.ELEMENTAL_BURST_DMG)
        .Values(0.15)
        .Next()

        .Where({ owner: { ascension: 4 }, effect: { conditions: ["HOLD"] } })
        .stat
        .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG, stats.stat.PLUNGE_ATTACK_DMG)
        .Values(0.15)
        .Build()
})