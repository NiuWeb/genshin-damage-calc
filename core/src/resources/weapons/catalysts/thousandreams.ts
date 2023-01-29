import { character, charbox, effect, scaling, stats, weapon } from "@src/core"

export const ThousandFloatingDreams = weapon.Factory({
    Name: "ThousandFloatingDreams",
    Type: stats.weapon.CATALYST,
    Stars: 5,
    Scaling: scaling.WeaponScaling.TYPE_44b,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "ThousandFloatingDreams1",
            MaxRank: 5,
            OnApply(target, ef, reg) {
                const char = target.GetCharacter()
                const em = reg.Modifier(char.CreateModifier(stats.stat.ELEMENTAL_MASTERY, 0))
                const dmg = [
                    reg.Modifier(char.CreateModifier(char.Options.Element, 0)),
                    reg.Modifier(char.CreateModifier(char.Options.Element, 0)),
                    reg.Modifier(char.CreateModifier(char.Options.Element, 0))
                ]

                function trigger() {
                    dmg.forEach(m => m.SetValue(0))
                    let members: character.Character[] = [char]
                    const party = target.GetParty()
                    if (party) {
                        members = party.GetMembers().map(t => t.GetCharacter())
                    }
                    let same = 0
                    let diff = 0
                    for (const member of members) {
                        if (member === char) { continue }
                        if (member.Options.Element === char.Options.Element) {
                            same++
                        } else {
                            const mod = dmg[diff++]
                            if (!mod) { continue }
                            mod.SetProp(member.Options.Element)
                            mod.SetValue(dmgValues[ef.GetRank() - 1])
                        }
                    }
                    same = Math.min(3, same)

                    em.SetValue(
                        emValues[ef.GetRank() - 1] * same
                    )
                }
                trigger()

                reg.Observer(target.Event.CreateObserver(charbox.CharboxEvent.CHANGE_PARTY, trigger))
                reg.Observer(ef.Event.CreateObserver(effect.EffectEvent.CHANGE_RANK, trigger))

                return () => 0
            },
        }),

        effect.Factory({
            Name: "ThousandFloatingDreams2",
            MaxRank: 5,
            ApplyOther: true,
            ApplySelf: false,
            StackSelf: true,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(40, 42, 44, 46, 48)
                .Build()
        })
    ]
})

const emValues = [32, 40, 48, 56, 64]
const dmgValues = [0.10, 0.14, 0.18, 0.22, 0.26]