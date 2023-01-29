import { character, charbox, effect, stats } from "@src/core"

export const Lithic = (Name: string) => effect.Factory({
    Name,
    MaxRank: 5,
    OnApply(target, ef, reg) {
        const char = target.GetCharacter()
        const cr = reg.Modifier(char.CreateModifier(stats.stat.CRIT_RATE, 0))
        const atk = reg.Modifier(char.CreateModifier(stats.stat.ATK_PERCENT, 0))

        function trigger() {
            let members: character.Character[] = [char]
            const party = target.GetParty()
            if (party) {
                members = party.GetMembers().map(t => t.GetCharacter())
            }

            const stacks = Math.min(4, members
                .filter(c => c.Options.Region === stats.region.LIYUE)
                .length)

            const crValue = crValues[ef.GetRank() - 1] * stacks
            const atkValue = atkValues[ef.GetRank() - 1] * stacks

            cr.SetValue(crValue)
            atk.SetValue(atkValue)
        }
        trigger()

        reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_RANK, trigger))
        reg.Observer(target.Event.CreateObserver(charbox.CharboxEvent.CHANGE_PARTY, trigger))

        return () => 0
    }
})

const crValues = [0.03, 0.04, 0.05, 0.06, 0.07]
const atkValues = [0.07, 0.08, 0.09, 0.1, 0.11]