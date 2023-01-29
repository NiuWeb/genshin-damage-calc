import { artifact, charbox, effect, stats } from "@src/core"

export const GildedDreams = artifact.Set({
    Name: "GildedDreams",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "GildedDreams2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(80)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "GildedDreams4",
            OnApply(target, _, reg) {
                const char = target.GetCharacter()
                const element = char.Options.Element
                const em = reg.Modifier(char.CreateModifier(stats.stat.ELEMENTAL_MASTERY, 0))
                const atk = reg.Modifier(char.CreateModifier(stats.stat.ATK_PERCENT, 0))

                function trigger() {
                    const party = target.GetParty()
                    if (!party) {
                        em.SetValue(0)
                        atk.SetValue(0)
                        return
                    }

                    let same = 0
                    let different = 0
                    for (const member of party.GetMembers()) {
                        if (member === target) { // skip set holder
                            continue
                        }
                        if (member.GetCharacter().Options.Element === element) {
                            same++
                        } else {
                            different++
                        }
                    }
                    same = Math.min(3, same)
                    different = Math.min(3, different)

                    atk.SetValue(0.14 * same)
                    em.SetValue(50 * different)
                }
                trigger()

                reg.Observer(target.Event.CreateObserver(charbox.CharboxEvent.CHANGE_PARTY, trigger))

                return () => 0
            },
        })
    ]
})