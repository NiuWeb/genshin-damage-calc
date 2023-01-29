/** Typed object with strings */
export type StringList<strings extends string> = {
    [k in strings]: string
}

/** Create an typed object with strings */
export function StringList<strings extends string>(...strings: (strings | StringList<strings>)[]): StringList<strings> {
    const result: { [x: string]: string } = {}

    strings.forEach(item => {
        if (typeof item === "string") {
            result[item] = item
        } else {
            for (const i in item) {
                result[i] = i
            }
        }
    })

    return result as StringList<strings>
}