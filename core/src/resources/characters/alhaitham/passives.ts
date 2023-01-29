import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "AlhaithamA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .observe.Target(stats.stat.ELEMENTAL_MASTERY)
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_DMG, stats.stat.ELEMENTAL_BURST_DMG)
        .Values(0.1 / 100)
        .Map((v, tg) => (
            Math.min(1, v * tg.GetCharacter().Get(stats.stat.ELEMENTAL_MASTERY))
        ))
        .Build()
})