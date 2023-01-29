import { charbox } from "@src/core"
import { FetchEnka } from "./fetch"
import { ParseEnka } from "./parse"

/**
 * Gets character data from Enka.Network service AND converts it
 * into calculator-specific character box objects.
 * @param uid The player UID to get from
 * @returns A list of character boxes loaded from player data
 */
export async function GetEnka(uid: string | number): Promise<charbox.Charbox[]> {
    const enka = await FetchEnka(uid)
    if (!enka) {
        throw new Error("[ENKA ERROR] Cannot fetch data from Enka.Network")
    }
    return ParseEnka(enka)
}