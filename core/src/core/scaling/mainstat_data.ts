import { stat } from "@core/stats"
import { ReadOnly } from "@src/utils/readonly"

/** Gets the value of an artifact's mainstat */
export function GetMainstatValue(stars: number, stat: number, level: number): number {
    if (stars === 5) {
        return MAINSTAT_5[stat][level]
    } else {
        return MAINSTAT_4[stat][level]
    }
}


const MAINSTAT_5 = ReadOnly({
    [stat.HP_FLAT]: [717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577, 4780],
    [stat.HP_PERCENT]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387, 0.407, 0.427, 0.446, 0.466],
    [stat.ATK_FLAT]: [47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298, 311],
    [stat.ATK_PERCENT]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387, 0.407, 0.427, 0.446, 0.466],
    [stat.DEF_PERCENT]: [0.087, 0.112, 0.137, 0.162, 0.186, 0.211, 0.236, 0.261, 0.286, 0.31, 0.335, 0.36, 0.385, 0.409, 0.434, 0.459, 0.484, 0.508, 0.533, 0.558, 0.583],
    [stat.CRIT_RATE]: [0.047, 0.06, 0.073, 0.086, 0.099, 0.113, 0.126, 0.139, 0.152, 0.166, 0.179, 0.192, 0.205, 0.218, 0.232, 0.245, 0.258, 0.271, 0.284, 0.298, 0.311],
    [stat.CRIT_DMG]: [0.093, 0.12, 0.146, 0.173, 0.199, 0.225, 0.252, 0.278, 0.305, 0.331, 0.357, 0.384, 0.41, 0.437, 0.463, 0.49, 0.516, 0.542, 0.569, 0.595, 0.622],
    [stat.ENERGY_RECHARGE]: [0.078, 0.1, 0.122, 0.144, 0.166, 0.188, 0.21, 0.232, 0.254, 0.276, 0.298, 0.32, 0.342, 0.364, 0.386, 0.408, 0.43, 0.452, 0.474, 0.496, 0.518],
    [stat.HEALING_BONUS]: [0.054, 0.069, 0.084, 0.1, 0.115, 0.13, 0.145, 0.161, 0.176, 0.191, 0.206, 0.221, 0.237, 0.252, 0.267, 0.282, 0.298, 0.313, 0.328, 0.343, 0.359],
    [stat.ELEMENTAL_MASTERY]: [28, 35.9, 43.8, 51.8, 59.7, 67.6, 75.5, 83.5, 91.4, 99.3, 107.2, 115.2, 123.1, 131, 138.9, 146.9, 154.8, 162.7, 170.6, 178.6, 186.5],
    [stat.ANEMO_DMG]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387, 0.407, 0.427, 0.446, 0.466],
    [stat.GEO_DMG]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387, 0.407, 0.427, 0.446, 0.466],
    [stat.CRYO_DMG]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387, 0.407, 0.427, 0.446, 0.466],
    [stat.PYRO_DMG]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387, 0.407, 0.427, 0.446, 0.466],
    [stat.HYDRO_DMG]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387, 0.407, 0.427, 0.446, 0.466],
    [stat.ELECTRO_DMG]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387, 0.407, 0.427, 0.446, 0.466],
    [stat.DENDRO_DMG]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387, 0.407, 0.427, 0.446, 0.466],
    [stat.PHYSICAL_DMG]: [0.087, 0.112, 0.137, 0.162, 0.186, 0.211, 0.236, 0.261, 0.286, 0.31, 0.335, 0.36, 0.385, 0.409, 0.434, 0.459, 0.484, 0.508, 0.533, 0.558, 0.583],
})

const MAINSTAT_4 = ReadOnly({
    [stat.HP_FLAT]: [645, 828, 1011, 1194, 1377, 1559, 1742, 1925, 2108, 2291, 2474, 2657, 2839, 3022, 3205, 3388, 3571],
    [stat.HP_PERCENT]: [0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33, 0.348],
    [stat.ATK_FLAT]: [42, 54, 66, 78, 90, 102, 113, 125, 137, 149, 161, 173, 185, 197, 209, 221, 232],
    [stat.ATK_PERCENT]: [0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33, 0.348],
    [stat.DEF_PERCENT]: [0.079, 0.101, 0.123, 0.146, 0.168, 0.19, 0.212, 0.235, 0.257, 0.279, 0.302, 0.324, 0.346, 0.368, 0.391, 0.413, 0.435],
    [stat.CRIT_RATE]: [0.042, 0.054, 0.066, 0.078, 0.09, 0.101, 0.113, 0.125, 0.137, 0.149, 0.161, 0.173, 0.185, 0.197, 0.208, 0.22, 0.232],
    [stat.CRIT_DMG]: [0.084, 0.108, 0.131, 0.155, 0.179, 0.203, 0.227, 0.25, 0.274, 0.298, 0.322, 0.345, 0.369, 0.393, 0.417, 0.441, 0.464],
    [stat.ENERGY_RECHARGE]: [0.07, 0.09, 0.11, 0.129, 0.149, 0.169, 0.189, 0.209, 0.228, 0.248, 0.268, 0.288, 0.308, 0.328, 0.347, 0.367, 0.387],
    [stat.HEALING_BONUS]: [0.048, 0.062, 0.076, 0.09, 0.103, 0.117, 0.131, 0.144, 0.158, 0.172, 0.186, 0.199, 0.213, 0.227, 0.24, 0.254, 0.268],
    [stat.ELEMENTAL_MASTERY]: [25.2, 32.3, 39.4, 46.6, 53.7, 60.8, 68, 75.1, 82.2, 89.4, 96.5, 103.6, 110.8, 117.9, 125, 132.2, 139.3],
    [stat.ANEMO_DMG]: [0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33, 0.348],
    [stat.CRYO_DMG]: [0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33, 0.348],
    [stat.ELECTRO_DMG]: [0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33, 0.348],
    [stat.GEO_DMG]: [0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33, 0.348],
    [stat.HYDRO_DMG]: [0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33, 0.348],
    [stat.PYRO_DMG]: [0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33, 0.348],
    [stat.DENDRO_DMG]: [0.063, 0.081, 0.099, 0.116, 0.134, 0.152, 0.17, 0.188, 0.206, 0.223, 0.241, 0.259, 0.277, 0.295, 0.313, 0.33, 0.348],
    [stat.PHYSICAL_DMG]: [0.079, 0.101, 0.123, 0.146, 0.168, 0.19, 0.212, 0.235, 0.257, 0.279, 0.302, 0.324, 0.346, 0.368, 0.391, 0.413, 0.435],
})