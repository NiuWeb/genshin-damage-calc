import { ReadOnly } from "@src/utils/readonly"

export const TalentScaling = ReadOnly({
    NONE: Array.from(Array(15)).fill(1) as number[],
    PHYSICAL_1: [1, 1.081, 1.163, 1.279, 1.36, 1.453, 1.581, 1.709, 1.837, 1.977, 2.116, 2.256, 2.395, 2.535, 2.674],
    PHYSICAL_1A: [1, 1.081, 1.163, 1.279, 1.36, 1.453, 1.581, 1.709, 1.837, 1.977, 2.137, 2.325, 2.513, 2.701, 2.906],
    PHYSICAL_2: [1, 1.068, 1.136, 1.227, 1.295, 1.375, 1.477, 1.58, 1.682, 1.784, 1.886, 1.989, 2.091, 2.193, 2.295],
    ELEMENTAL_1: [1, 1.075, 1.15, 1.25, 1.325, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.125, 2.25, 2.375],
    ELEMENTAL_1A: [1, 1.075, 1.15, 1.25, 1.325, 1.4, 1.5, 1.6, 1.7, 1.8, 1.904, 2.04, 2.176, 2.312, 2.448],
    ELEMENTAL_2: [1, 1.06, 1.12, 1.198, 1.257, 1.317, 1.395, 1.473, 1.551, 1.629, 1.707, 1.784, 1.862, 1.94, 2.018],
    FLAT_1: [1, 1.1, 1.208, 1.325, 1.45, 1.583, 1.725, 1.875, 2.033, 2.2, 2.375, 2.559, 2.75, 2.95, 3.159]
})

/** talent scaling data */
export interface TalentScaling {
    /** talent level stat which the instance scales with */
    Talent: number
    /** talent scaling */
    Scaling: readonly number[]
    /** Scaling stat */
    Stat: number
    /** initial talent value */
    Initial: number
}
