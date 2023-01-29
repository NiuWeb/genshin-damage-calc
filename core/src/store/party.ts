import { artbox, charbox } from "@src/core"
import { characters, weapons } from "@src/resources"

/**
 * Re-creates a party from its data.
 * @param data Party data
 */
export function PartyFrom(data: charbox.ExportedParty): charbox.Party {
    const party = new charbox.Party()
    for (const charName in data.characters) {
        const charGenerator = characters.FindByName(charName)
        if (!charGenerator) {
            throw new Error(`Character not found: ${charName}`)
        }
        const char = charGenerator()
        party.Add(char)

        const dat = data.characters[charName]
        const weaponName = Object.keys(dat.weapon)[0]
        if (weaponName) {
            const wpGenerator = weapons.FindByName(weaponName)
            if (!wpGenerator) {
                throw new Error(`Weapon not found: ${charName}`)
            }
            char.SetWeapon(wpGenerator)
        }

        if (dat.artifacts && Object.keys(dat.artifacts).length > 0) {
            char.SetArtifacts(new artbox.Artbox(char))
        }
    }
    charbox.ImportParty(data, party)
    return party
}