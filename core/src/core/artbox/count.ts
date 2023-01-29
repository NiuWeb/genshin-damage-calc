export type Grouped = [name: string, count: number][]
export function CountSets(sets: (string | undefined)[]): [Grouped, string[]] {
    const base: [name: string, count: number][] = []

    for (const set of sets) {
        if (!set) { continue }
        const found = base.find(s => s[0].toLowerCase() === set.toLowerCase())
        if (found) {
            found[1]++
        } else {
            base.push([set.toLowerCase(), 1])
        }
    }

    const final: [name: string, count: number][] = []
    const names: string[] = []

    for (const row of base) {
        if (row[1] >= 4) {
            final.push([row[0], 4])
            names.push(row[0])
            names.push(row[0])
        } else if (row[1] >= 2) {
            final.push([row[0], 2])
            names.push(row[0])
        }
    }

    return [final, names]
}