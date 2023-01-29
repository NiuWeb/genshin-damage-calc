import { GetSubstatValue } from "@core/scaling"
import { EquipRollsLp } from "./equip_lp"
import { Options, Result } from "./type"

/** 
 * Finds a distribution of the given substat rolls between the 5 artifacts
*/
export function EquipRolls(options: Options): Result {
    // use the solver to find the rolls distribution
    const rolls = EquipRollsLp(options)

    for (const art of rolls) {
        for (const sub of art) {
            // find the value of a single roll
            const value = GetSubstatValue(options.stars, sub[0], options.tier)
            // replace the number of rolls by the final substat value
            sub[1] *= value
        }
    }
    return rolls
}