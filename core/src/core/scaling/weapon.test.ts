import { stat } from "@core/stats"
import { GetWeaponAtkBase, GetWeaponSubstat } from "./weapon"
import { WeaponScaling } from "./weapon_data"

describe("Weapon scaling", () => {
    test("ATK Base of Jade Cutter level 90", () => {
        const value = GetWeaponAtkBase(5, WeaponScaling.TYPE_44b, 90, 6)
        expect(value).toBeCloseTo(542, -0.5)
    })
    test("Substat of Jade Cutter level 90", () => {
        const value = GetWeaponSubstat(WeaponScaling.TYPE_44b, 90, stat.CRIT_RATE)
        expect(value).toBeCloseTo(0.441, 3)
    })
})