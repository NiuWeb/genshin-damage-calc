import { effect, stats } from "@src/core"
import { checkElements } from "./elements"

export const a1 = effect.Factory({
    Name: "NilouA1",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where((target, owner) => {
            if (owner.GetCharacter().GetAscension() < 1) { return false }
            return checkElements(target)
        })
        .observe.Party(true)
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Values(100)
        .Build()
})

export const a4 = effect.Factory({
    Name: "NilouA4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where((target, owner) => {
            if (owner.GetCharacter().GetAscension() < 4) { return false }
            return checkElements(target)
        })
        .observe.Party(true)
        .observe.Owner(stats.stat.HP_FLAT, stats.stat.HP_BASE, stats.stat.HP_PERCENT)
        .stat
        .Char(stats.stat.BLOOM_DMG)
        .Values(0.09)
        .Map((v, _, ef) => (
            Math.max(0, Math.min(4,
                (ef.Owner.GetCharacter().Get(stats.stat.HP) - 30_000) * v / 1000
            ))
        ))
        .Build()
})