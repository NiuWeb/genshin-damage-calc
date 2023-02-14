import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "FaruzanA4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 4 } })
        .observe.Owner(stats.stat.ATK_BASE)
        .stat
        .Char(stats.stat.ANEMO_DMG_FLAT)
        .Values(0.32)
        .Map((v, _, ef) => ef.Owner.GetCharacter().Get(stats.stat.ATK_BASE) * v)
        .Build()
})