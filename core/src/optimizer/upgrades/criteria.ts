import { CostResult } from "./cost/type"


/** all optimization criteria */
export const Criteria = criteria({
    /** maximizes the damage */
    damage: {
        criteria: "max",
        fn(damage) {
            return damage
        },
    },
    /** minimizes the cost */
    cost: {
        criteria: "min",
        fn(_, cost) {
            return cost.cost
        }
    },
    /** maximizes the damage per cost unit */
    efficiency: {
        criteria: "max",
        fn(damage, cost) {
            return damage / cost.cost
        }
    }
})
/**
 * Names of all optimization criteria
 */
export type Criteria = keyof typeof Criteria
/**
 * Values of all optimization criteria
 */
export type CriteriaValues = {
    [key in Criteria]: number
}
/**
 * Function that calculates a criteria value
 */
export type CriteriaFn =
    (damage: number, costs: CostResult) => number
/**
 * Generic list of criteria
 */
export type CriteriaList<Keys extends string> = {
    [key in Keys]: {
        criteria: "max" | "min"
        fn: CriteriaFn
    }
}
/**
 * Wrapper function to create a criteria list
 */
function criteria<Keys extends string>(criteria: CriteriaList<Keys>) {
    return criteria
}
