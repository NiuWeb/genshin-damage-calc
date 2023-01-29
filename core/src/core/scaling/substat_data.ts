import { stat } from "@core/stats"
import { ReadOnly } from "@src/utils/readonly"

/** Substat tiers are the 4 possible values for a single substat, plus the average between those values */
export enum SubstatTier {
    ROLL_1,
    ROLL_2,
    ROLL_3,
    ROLL_4,
    ROLL_AVG,
    ROLL_MIN = 0,
    ROLL_MAX = 3,
}

/**
 * Gets the value of a single substat roll for the given artifact attributes.
 * @param stars artifact stars, must be 4 or 5.
 * @param stat the stat to get the value for.
 * @param tier quality of the substat, [0-3].
*/
export function GetSubstatValue(stars: number, stat: number, tier: SubstatTier): number {
    if (stars === 4) {
        if (tier === SubstatTier.ROLL_AVG) {
            return (SUBSTAT_4[stat][0] + SUBSTAT_4[stat][1] + SUBSTAT_4[stat][2] + SUBSTAT_4[stat][3]) / 4
        } else {
            return SUBSTAT_4[stat][tier]
        }
    } else if (stars === 5) {
        if (tier === SubstatTier.ROLL_AVG) {
            return (SUBSTAT_5[stat][0] + SUBSTAT_5[stat][1] + SUBSTAT_5[stat][2] + SUBSTAT_5[stat][3]) / 4
        } else {
            return SUBSTAT_5[stat][tier]
        }
    }
    return 0
}

/** gets the maximum rolls of a single substat */
export function GetSubstatMaxRolls(stars: number): number {
    if (stars === 4) {
        return 4
    } else if (stars === 5) {
        return 6
    }
    return 0
}
/** gets the maximum rolls of an artifact */
export function GetMaxRolls(stars: number): number {
    if (stars === 4) {
        return 7
    } else if (stars === 5) {
        return 9
    }
    return 0
}

/** Gets the maximun value of a single substat */
export function GetSubstatMax(stars: number, stat: number): number {
    return GetSubstatMaxRolls(stars) * GetSubstatValue(stars, stat, SubstatTier.ROLL_4)
}

const SUBSTAT_5 = ReadOnly({
    [stat.HP_FLAT]: [209.13, 239.0, 268.88, 298.75],
    [stat.HP_PERCENT]: [0.0408, 0.0466, 0.0525, 0.0583],
    [stat.ATK_FLAT]: [13.62, 15.56, 17.51, 19.45],
    [stat.ATK_PERCENT]: [0.0408, 0.0466, 0.0525, 0.0583],

    [stat.PYRO_DMG]: [0.0408, 0.0466, 0.0525, 0.0583],
    [stat.CRYO_DMG]: [0.0408, 0.0466, 0.0525, 0.0583],
    [stat.HYDRO_DMG]: [0.0408, 0.0466, 0.0525, 0.0583],
    [stat.ELECTRO_DMG]: [0.0408, 0.0466, 0.0525, 0.0583],
    [stat.ANEMO_DMG]: [0.0408, 0.0466, 0.0525, 0.0583],
    [stat.GEO_DMG]: [0.0408, 0.0466, 0.0525, 0.0583],
    [stat.DENDRO_DMG]: [0.0408, 0.0466, 0.0525, 0.0583],
    [stat.PHYSICAL_DMG]: [0.051, 0.0583, 0.0656, 0.0729],

    [stat.HEALING_BONUS]: [0.03143, 0.03589799019607843, 0.040443014705882345, 0.044911004901960774],

    [stat.DEF_FLAT]: [16.2, 18.52, 20.83, 23.15],
    [stat.DEF_PERCENT]: [0.051, 0.0583, 0.0656, 0.0729],
    [stat.CRIT_RATE]: [0.0272, 0.0311, 0.035, 0.0389],
    [stat.CRIT_DMG]: [0.0544, 0.0622, 0.0699, 0.0777],
    [stat.ENERGY_RECHARGE]: [0.0453, 0.0518, 0.0583, 0.0648],
    [stat.ELEMENTAL_MASTERY]: [16.32, 18.65, 20.98, 23.31],
})

const SUBSTAT_4 = ReadOnly({
    [stat.HP_FLAT]: [167.3, 191.2, 215.1, 239.0],
    [stat.HP_PERCENT]: [0.0326, 0.0373, 0.042, 0.0466],
    [stat.ATK_FLAT]: [10.89, 12.45, 14.0, 15.56],
    [stat.ATK_PERCENT]: [0.0326, 0.0373, 0.042, 0.0466],

    [stat.PYRO_DMG]: [0.0326, 0.0373, 0.042, 0.0466],
    [stat.CRYO_DMG]: [0.0326, 0.0373, 0.042, 0.0466],
    [stat.HYDRO_DMG]: [0.0326, 0.0373, 0.042, 0.0466],
    [stat.ELECTRO_DMG]: [0.0326, 0.0373, 0.042, 0.0466],
    [stat.ANEMO_DMG]: [0.0326, 0.0373, 0.042, 0.0466],
    [stat.GEO_DMG]: [0.0326, 0.0373, 0.042, 0.0466],
    [stat.DENDRO_DMG]: [0.0326, 0.0373, 0.042, 0.0466],
    [stat.PHYSICAL_DMG]: [0.0408, 0.0466, 0.0525, 0.0583],

    [stat.HEALING_BONUS]: [0.0251, 0.02866813725490196, 0.032297794117647056, 0.035865931372549016],

    [stat.DEF_FLAT]: [12.96, 14.82, 16.67, 18.52],
    [stat.DEF_PERCENT]: [0.0408, 0.0466, 0.0525, 0.0583],
    [stat.CRIT_RATE]: [0.0218, 0.0249, 0.028, 0.0311],
    [stat.CRIT_DMG]: [0.0435, 0.0497, 0.056, 0.0622],
    [stat.ENERGY_RECHARGE]: [0.0363, 0.0414, 0.0466, 0.0518],
    [stat.ELEMENTAL_MASTERY]: [13.06, 14.92, 16.79, 18.65],
})