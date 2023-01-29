import { character, charbox, effect, stats } from "@src/core"

export const Wavewalker = (Name: string) => effect.Factory({
    Name,
    MaxRank: 5,
    OnApply(target, ef, reg) {
        const char = target.GetCharacter()
        const dmg = reg.Modifier(char.CreateModifier(stats.stat.ELEMENTAL_BURST_DMG, 0))

        function trigger() {
            let members: character.Character[] = [char]
            const party = target.GetParty()
            if (party) {
                members = party.GetMembers().map(t => t.GetCharacter())
            }

            let energy = 0
            for (const member of members) {
                energy += member.Options.BurstCost
            }

            const value = Math.min(maxValues[ef.GetRank() - 1], values[ef.GetRank() - 1] * energy)
            dmg.SetValue(value)
        }

        reg.Observer(ef.Event.CreateObserver(effect.EffectEvent.CHANGE_RANK, trigger))
        reg.Observer(target.Event.CreateObserver(charbox.CharboxEvent.CHANGE_PARTY, trigger))

        return () => 0
    }
})

const values = [0.12 / 100, 0.15 / 100, 0.18 / 100, 0.21 / 100, 0.24 / 100]
const maxValues = [0.4, 0.5, 0.6, 0.7, 0.8]