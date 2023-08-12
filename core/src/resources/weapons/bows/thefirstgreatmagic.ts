import { effect, scaling, stats, weapon } from "@src/core"

export const TheFirstGreatMagic = weapon.Factory({
    Name: "TheFirstGreatMagic",
    Type: stats.weapon.BOW,
    Stars: 5,
    Substat: stats.stat.CRIT_DMG,
    Scaling: scaling.WeaponScaling.TYPE_46,

    Effects: [
        effect.Factory({
            Name: "TheFirstGreatMagic1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Next()
                .observe.Party(true)
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Map((value, char) => {
                    let stacks = 1

                    const element = char.GetCharacter().Options.Element
                    const party = char.GetParty()
                    if (party) {
                        for (const member of party.GetMembers()) {
                            if (member !== char && member.GetCharacter().Options.Element === element) {
                                stacks++
                            }
                        }
                    }

                    stacks = Math.min(stacks, 3)

                    return value * stacks
                })
                .Build()
        })
    ]
})