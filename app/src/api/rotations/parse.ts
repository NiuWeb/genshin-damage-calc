import { genshin } from "@src/genshin/core"
import { FindKey } from "@src/strings/strings"

/** Character data in a rotation */
export interface CharacterContent {
    name: string
    element: number
    constellation: number
}
/**
 * Content of a rotation file with its parsed metadata
 */
export interface RotationContent {
    title: string
    characters: CharacterContent[]
    description: string
    content: string
}

/**
 * Parses the metadata (title, description, etc.) from the code
 * string of a rotation
 */
export function parseRotation(code: string): RotationContent {
    // metadata is in the first multiline comment of the rotation
    const meta = code.match(/^\s*\/\*((?:.|\s)*?)\*\//i)
    if (!meta) {
        return {
            title: "unknown rotation title",
            characters: [],
            description: "no description",
            content: code,
        }
    }
    // metadata is separated by tags in the form `@tag:content`
    const metaParts = meta[1].trim().split(/@([a-z_]\w*):/)
    // first index is empty
    metaParts.shift()

    const metadata: { [key: string]: string } = {}

    for (let i = 0; i < metaParts.length - 1; i += 2) {
        const key = metaParts[i].trim().toLowerCase()
        const value = metaParts[i + 1].trim()
        metadata[key] = value
    }
    const characters = (metadata["characters"] || "")
        .split(/,|;|-|\//)
        .map(str => str.trim())
        .map(value => {
            // find character name and constellation number
            const match = value.match(/^\s*(.*)\s+C(\d+)\s*$/i)
            if (!match) return {
                name: value,
                constellation: 0,
                element: 0,
            }

            const charname = (FindKey(match[1], true) || "NONE").replace(/ITEM\./i, "")
            const constellation = parseInt(match[2]) || 0

            const character = genshin.characters.FindByName(charname)
            if (!character) {
                return {
                    name: charname,
                    constellation,
                    element: 0,
                }
            }
            return {
                name: character.Name,
                constellation,
                element: character.Element
            }
        })

    return {
        title: metadata["title"] || "unknown rotation title",
        characters,
        description: metadata["description"] || "no description",
        content: code,
    }
}