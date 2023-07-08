
import { Calc } from "@src/genshin/calc"
import { genshin } from "@src/genshin/core"

/**
 * Add characters to the party.
 */
export function EnkaAdd(characters: readonly genshin.charbox.Charbox[]) {
    const party = Calc.Get().Scenario.Party

    for (const char of characters) {
        const name = char.GetCharacter().Options.Name
        const exists = party.FindMember(name)
        if (exists) {
            genshin.store.CopyCharbox(char, exists)
        } else {
            party.Add(char)
        }
    }

    Calc.Run("character set " + characters[0].GetCharacter().Options.Name)
}