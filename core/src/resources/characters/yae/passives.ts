import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "YaeA4",
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.ELEMENTAL_MASTERY)
        .Where({ target: { ascension: 4 } })
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_DMG)
        .Values(0.15 / 100)
        .Map((v, tg) => (
            v * tg.GetCharacter().Get(stats.stat.ELEMENTAL_MASTERY)
        ))
        .Build()
})