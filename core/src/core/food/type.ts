import type { Charbox } from "../charbox"
import type { Food } from "./food"

/** food types */
export enum FoodType {
    /** foods with atk/dmg buffs like adeptus temptation */
    OFFENSIVE,
    /** foods with def/hp buffs */
    DEFENSIVE,
    /** foods with stamina recover/reduction */
    STAMINA,
    /** potions */
    ELEMENTAL,
}

export type FoodMod = [stat: number, min: number, max: number]

/** options to create a food */
export interface Options {
    /** food type */
    Type: FoodType
    /** food name */
    Name: string
    /** Food modifiers */
    Effects: FoodMod[]
}

/** generator function for foods */
export interface Generator extends Options {
    (target: Charbox): Food
    readonly Options: Options
}