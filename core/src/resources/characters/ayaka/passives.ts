import { effect, stats } from "@src/core"

export const sprint = effect.Factory({
    Name: "AyakaSprint",
    OnApply: new effect.Builder()
        .infusion
        .Set(stats.stat.CRYO_DMG, false)
        .Build()
})

export const a1 = effect.Factory({
    Name: "AyakaA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
        .Values(0.3)
        .Build()
})

export const a4 = effect.Factory({
    Name: "AyakaA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .stat
        .Char(stats.stat.CRYO_DMG)
        .Values(0.18)
        .Build()
})