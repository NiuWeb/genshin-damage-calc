import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "NaviaA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .infusion
        .Set(stats.stat.GEO_DMG, true)
        .Next()

        .Where({ target: { ascension: 1 } })
        .stat
        .Char(
            stats.stat.NORMAL_ATTACK_DMG,
            stats.stat.CHARGED_ATTACK_DMG,
            stats.stat.PLUNGE_ATTACK_DMG,
        )
        .Values(0.4)
        .Build()
})

export const a4 = effect.Factory({
    Name: "NaviaA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .observe.Party(true)
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.2)
        .Map((val, charbox) => {
            const party = charbox.GetParty()?.GetMembers() || [charbox]

            let stacks = 0
            for (const char of party) {
                const el = char.GetCharacter().Options.Element
                if (stats.Swirlable.includes(stats.DmgToAura(el))) {
                    stacks++
                }
            }
            if (stacks > 2) stacks = 2

            return val * stacks
        })
        .Build()
})