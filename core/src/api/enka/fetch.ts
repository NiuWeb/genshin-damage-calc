import { Enka } from "./type"

const EnkaUrl = "https://enka.network"

/**
 * Fetches player showcase data from Enka.Network service,
 * in site-specific format
 * @param uid Player in-game UID
 * @returns Player showcased data in Enka.Network format
 */
export async function FetchEnka(uid: string | number): Promise<Enka | undefined> {
    try {
        const request = await fetch(EnkaUrl + "/u/" + uid + "/__data.json")
        const json = await request.json()
        return json
    } catch (e) {
        console.error("[ENKA ERROR]", e)
    }
    return undefined
}