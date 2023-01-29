import { SetConfig } from "./type"

/**
 * Determines whether a list of artifact sets is valid
 * @param config Optimizer config
 * @param sets Array of sets in the form [setName, number of pieces][]
 */
export function FilterSets(config: SetConfig, sets: [string, number][]): boolean {
    if (config.allowSetNumber) {
        const allow = config.allowSetNumber
        if (sets.length === 0 && !allow.includes(0)) {
            return false
        }
        const counts = sets.map(([, c]) => c)
        if (!counts.some(c => allow.includes(c))) {
            return false
        }
    }

    if (config.allowOnly) {
        const allow = config.allowOnly.map(s => s.toLowerCase())
        const names = sets.map(s => s[0].toLowerCase())
        if (!names.every(name => allow.includes(name))) {
            return false
        }
    }

    return true
}