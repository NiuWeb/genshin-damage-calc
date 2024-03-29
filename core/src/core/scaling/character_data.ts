import { stat } from "@core/stats"
import { ReadOnly } from "@src/utils/readonly"

/** Transformative base damage for characters */
export const TRANSFORMATIVE = ReadOnly([8.5828025, 9.267524, 9.952427, 10.6374515, 11.3227, 12.3248065, 13.3203215, 14.4342935, 15.6838395, 17.0716715, 18.6005, 20.33, 22.223334, 24.2817595, 26.87424, 29.5409485, 32.2100235, 34.8622275, 37.5615685, 40.2923875, 43.056014, 45.851871, 48.622314, 51.406322, 54.2047815, 56.600847, 59.051453, 61.489659, 64.863665, 68.146455, 71.335425, 74.5145145, 77.7084935, 80.9127475, 84.5531565, 88.2590385, 92.0363705, 95.854759, 99.778454, 103.691021, 107.69945, 112.0828335, 116.75108, 121.6752865, 128.0315335, 134.2717465, 140.7630375, 147.506824, 154.533594, 161.8007985, 168.378771, 175.265156, 182.2413525, 189.3095905, 199.3002085, 208.199127, 217.193498, 226.4755255, 236.3031085, 246.442445, 256.7842715, 269.551599, 282.7552815, 296.2693765, 312.2217135, 325.735074, 339.748415, 353.89703, 368.335711, 382.8201155, 397.3867015, 412.3386985, 425.5788905, 438.871045, 457.1145615, 473.373376, 489.705693, 505.611511, 522.395873, 538.721834, 554.99877, 571.4883075, 588.1847415, 605.0921965, 626.9178295, 644.4764005, 662.742046, 681.728464, 702.5486885, 723.426729, 744.1077735, 764.2222835, 790.1839555, 815.423764, 855.5988925, 890.2269705, 923.6614045, 955.7371545, 986.432171, 1015.035904])

/** level multiplier for attribute scaling of 4-star characters */
export const CHARACTER_ATTRIBUTE_4 = ReadOnly([1.0, 1.083, 1.165, 1.248, 1.33, 1.413, 1.495, 1.578, 1.661, 1.743, 1.826, 1.908, 1.991, 2.073, 2.156, 2.239, 2.321, 2.404, 2.486, 2.569, 2.651, 2.734, 2.817, 2.899, 2.982, 3.064, 3.147, 3.229, 3.312, 3.394, 3.477, 3.56, 3.642, 3.725, 3.807, 3.89, 3.972, 4.055, 4.138, 4.22, 4.303, 4.385, 4.468, 4.55, 4.633, 4.716, 4.798, 4.881, 4.963, 5.046, 5.128, 5.211, 5.294, 5.376, 5.459, 5.541, 5.624, 5.706, 5.789, 5.872, 5.954, 6.037, 6.119, 6.202, 6.284, 6.367, 6.45, 6.532, 6.615, 6.697, 6.78, 6.862, 6.945, 7.028, 7.11, 7.193, 7.275, 7.358, 7.44, 7.523, 7.606, 7.688, 7.771, 7.853, 7.936, 8.018, 8.101, 8.183, 8.266, 8.349])

/** level multiplier for attribute scaling of 5-star characters */
export const CHARACTER_ATTRIBUTE_5 = ReadOnly([1, 1.083, 1.166, 1.25, 1.333, 1.417, 1.5, 1.584, 1.668, 1.751, 1.835, 1.919, 2.003, 2.088, 2.172, 2.256, 2.341, 2.425, 2.51, 2.594, 2.679, 2.764, 2.849, 2.934, 3.019, 3.105, 3.19, 3.275, 3.361, 3.446, 3.532, 3.618, 3.704, 3.789, 3.875, 3.962, 4.048, 4.134, 4.22, 4.307, 4.393, 4.48, 4.567, 4.653, 4.74, 4.827, 4.914, 5.001, 5.089, 5.176, 5.263, 5.351, 5.438, 5.526, 5.614, 5.702, 5.79, 5.878, 5.966, 6.054, 6.142, 6.23, 6.319, 6.407, 6.496, 6.585, 6.673, 6.762, 6.851, 6.94, 7.029, 7.119, 7.208, 7.297, 7.387, 7.476, 7.566, 7.656, 7.746, 7.836, 7.926, 8.016, 8.106, 8.196, 8.286, 8.377, 8.467, 8.558, 8.649, 8.739])

/** ascension value for attribute scaling */
export const ASCENSION_MULTIPLIER = ReadOnly([38.0 / 182.0, 65.0 / 182.0, 101.0 / 182.0, 128.0 / 182.0, 155.0 / 182.0, 1.0])

/** ascension value for bonus stat */
export const BONUS_ASCENSION_MULTIPLIER = ReadOnly([0, 1, 2, 2, 3, 4])

/** bonus stats per ascension for 4-star characters */
export const BONUS_STAT_4 = ReadOnly({
    [stat.ATK_PERCENT]: 0.06,
    [stat.HP_PERCENT]: 0.06,
    [stat.DEF_PERCENT]: 0.075,
    [stat.PHYSICAL_DMG]: 0.075,
    [stat.ENERGY_RECHARGE]: 0.067,
    [stat.ELEMENTAL_MASTERY]: 24,

    [stat.PYRO_DMG]: 0.06,
    [stat.CRYO_DMG]: 0.06,
    [stat.HYDRO_DMG]: 0.06,
    [stat.ELECTRO_DMG]: 0.06,
    [stat.ANEMO_DMG]: 0.06,
    [stat.GEO_DMG]: 0.06,
    [stat.DENDRO_DMG]: 0.06,
    [stat.PHYSICAL_DMG]: 0.06,
})

/** bonus stats per ascension for 5-star characters */
export const BONUS_STAT_5 = ReadOnly({
    [stat.ATK_PERCENT]: 0.072,
    [stat.HP_PERCENT]: 0.072,
    [stat.PHYSICAL_DMG]: 0,
    [stat.ENERGY_RECHARGE]: 0.08,
    [stat.ELEMENTAL_MASTERY]: 28.8,
    [stat.HEALING_BONUS]: 0.055,
    [stat.CRIT_RATE]: 0.048,
    [stat.CRIT_DMG]: 0.096,

    [stat.PYRO_DMG]: 0.072,
    [stat.CRYO_DMG]: 0.072,
    [stat.HYDRO_DMG]: 0.072,
    [stat.ELECTRO_DMG]: 0.072,
    [stat.ANEMO_DMG]: 0.072,
    [stat.GEO_DMG]: 0.072,
    [stat.DENDRO_DMG]: 0.072,
    [stat.PHYSICAL_DMG]: 0.072
})