/** food optimizer combination is a list of food names */
export type Row = string[]

/** food optimizer result */
export interface Result {
    /** food names */
    foods: string[]
    /** equip cmd */
    cmd: string
    damage: number
    relative: number
}