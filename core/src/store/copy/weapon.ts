import { charbox, weapon } from "@src/core"
import { weapons } from "@src/resources"

/**
 * Copies a weapon from a character box to another.
 * If the weapon is the same, it will only copy the data,
 * and the targets will be kept.
 * Otherwise, the weapon will be replaced and the targets
 * will be lost.
 * 
 * If the origin has no weapon, the target weapon will also
 * be removed.
 */
export function CopyWeapon(copyFrom: charbox.Charbox, copyTo: charbox.Charbox) {
    const weaponFrom = copyFrom.GetWeapon()
    const weaponTo = copyTo.GetWeapon()

    // origin has no weapon, just remove the target weapon
    if (!weaponFrom) {
        copyTo.SetWeapon(undefined)
        return
    }

    // target has no weapon or weapons are different,
    // add a new weapon to the target
    if (!weaponTo || weaponTo.Options.Name !== weaponFrom.Options.Name) {
        const generator = weapons.FindByName(weaponFrom.Options.Name)
        if (!generator) {
            throw new Error(`Weapon not found: ${weaponFrom.Options.Name}`)
        }
        copyTo.SetWeapon(generator)
    }

    const target = copyTo.GetWeapon()
    if (!target) {
        throw new Error("Target has no weapon")
    }

    // now just change level, rank and ascension
    weapon.Import(weapon.Export(weaponFrom), target)
}