import { effect, scaling, stats, weapon } from "@src/core"

export const BalladOfTheFjords = weapon.Factory({
    Name: "BalladOfTheFjords",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "BalladOfTheFjords1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .observe.Party(true)
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(120, 150, 180, 210, 240)
                .Map((x, charbox) => {
                    const party = charbox.GetParty()
                    if (!party) {
                        return 0
                    }
                    const elements = new Set<number>()
                    for (const member of party.GetMembers()) {
                        elements.add(member.GetCharacter().Options.Element)
                    }

                    return elements.size >= 3 ? x : 0
                })

                .Build()
        })
    ]
})