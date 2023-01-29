const ascension = [20, 40, 50, 60, 70, 80, 90] as const

// gets the minimum ascension for the given level
export function getMinAscension(level: number): number {
    if (level < 0) {
        level = 0
    } else if (level > 90) {
        level = 90
    }
    for (let a = 0; a < ascension.length; a++) {
        const l = ascension[a]
        if (level <= l) {
            return a
        }
    }
    return 0
}

// gets the maximum ascension for the given level
export function getMaxAscension(level: number): number {
    if (level < 0) {
        level = 0
    } else if (level > 90) {
        level = 90
    }

    for (let a = 0; a < ascension.length; a++) {
        const l = ascension[a]
        if (level === l) {
            let r = a + 1
            if (r > 6) {
                r = 6
            }
            return r
        } else if (level <= l) {
            return a
        }
    }
    return 0
}
