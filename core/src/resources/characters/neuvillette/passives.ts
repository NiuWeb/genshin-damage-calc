import { effect, stats } from "@src/core";

export const a1 = effect.Factory({
    Name: "NeuvilletteA1",
    MaxStacks: 3,
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .mv
        .Multiplier(1, "HIT_CHARGED_2", "HIT_CHARGED_C6")
        .Map((_, __, ef) => (
            [0, 1.1, 1.25, 1.6][ef.GetStacks()]
        ))
        .Build(),
})

export const a4 = effect.Factory({
    Name: "NeuvilletteA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .observe.Target(stats.stat.HP_CURRENT)
        .stat
        .Char(stats.stat.HYDRO_DMG)
        .Values(1)
        .Map((_, char) => (
            Math.min(
                0.3,
                0.6 * Math.max(0, char.GetCharacter().Get(stats.stat.HP_CURRENT) - 0.3)
            )
        ))
        .Build(),
})