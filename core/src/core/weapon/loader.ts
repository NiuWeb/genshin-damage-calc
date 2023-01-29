import { Weapon } from "./weapon"

/** Exported weapon data */
export interface Exported {
    level: number
    ascension: number
    rank: number
}

/** Exports a weapon */
export function Export(wp: Weapon): Exported {
    return {
        level: wp.GetLevel(),
        ascension: wp.GetAscension(),
        rank: wp.GetRank(),
    }
}

/** Imports a weapon */
export function Import(data: Exported, wp: Weapon): void {
    wp.SetLevel(data.level)
    wp.SetAscension(data.ascension)
    wp.SetRank(data.rank)
}