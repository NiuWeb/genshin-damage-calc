import { genshin } from "@src/genshin/core"
import { GetLanguage, GetString } from "@src/strings/strings"
import { useMemo } from "react"

const dbWeapons = genshin.weapons.GetList()
const dbSets = genshin.sets.GetList()

function joinEffects(effects: genshin.effect.Generator[]): string {
    let str = effects.map(ef => GetString("ITEM." + ef.Name, { description: true })).join("\n")

    // remove rank tags
    str = str.replace(/#rank\{([^}]+)\}/g, (_, match) => {
        return match.split("|").join("/")
    })

    return str
}

export interface DbItem {
    stars: number
    id: string
    name: string
    description: string
}

/**
 * Hook to get a list of items from the database
 */
export function useDbList(list: "weapons" | "sets"): DbItem[] {
    const lang = GetLanguage()

    return useMemo(() => {
        let result: DbItem[] = []
        if (list === "weapons") {
            result = dbWeapons.map(weapon => ({
                stars: weapon.Stars,
                id: weapon.Name,
                name: GetString("ITEM." + weapon.Name) + " (" +
                    GetString("ITEM." + genshin.stats.weapon.Name(weapon.Type)) + ")",
                description: joinEffects(weapon.Effects)
            }))
        } else {
            const sets: DbItem[] = []

            for (const set of dbSets) {
                [...set.Piece2, ...set.Piece4].forEach(piece => {
                    sets.push({
                        stars: set.Stars,
                        id: piece.Name,
                        name: GetString("ITEM." + piece.Name),
                        description: joinEffects([piece])
                    })
                })
            }

            result = sets
        }

        result.sort((a, b) => {
            if (a.stars !== b.stars) {
                return a.stars - b.stars
            }

            return a.name.localeCompare(b.name)
        })

        return result
    }, [lang, list])
}