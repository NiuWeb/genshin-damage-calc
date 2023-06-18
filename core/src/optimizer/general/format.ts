import { stats } from "@src/core"
import { CountSets } from "@src/core/artbox/count"
import { Table, TableCell } from "@src/strings/table"
import { toPlaces } from "@src/utils/numbers"
import { Result } from "./type"

export function formatResults(results: Result[]): Table {
    const optimized = new Set<number>()
    const indexes = new Map<number, number>()
    for (const { substats } of results) {
        if (!substats?.optimized) {
            continue
        }
        for (const stat of substats.optimized) {
            optimized.add(stat)
        }
    }

    const substatNames = [...optimized].map((stat, i) => {
        indexes.set(stat, i)
        return stats.stat.Name(stat)
    })

    const table = new Table(
        "WEAPON", "SANDS", "GOBLET", "CIRCLET", "SET", "ATK", "DEF", "HP",
        ...substatNames, "DAMAGE", "RELATIVE"
    )

    for (const { combination, substats, damage, relative } of results) {
        let weapon = ""
        if (!combination.weapon.empty) {
            weapon = combination.weapon.name + ` (R${combination.weapon.rank})`
        }

        let artifacts = makeCells(3)
        let sets = ""
        if (!combination.artifact.empty) {
            const mains = [combination.artifact.sands, combination.artifact.goblet, combination.artifact.circlet]
            artifacts = mains.map(main => stats.stat.Name(main))

            if (combination.artifact.set) {
                const pieces: string[] = []
                for (const set of combination.artifact.set) {
                    pieces.push(set, set)
                }
                const [grouped] = CountSets(pieces)
                sets = grouped.map(([name, count]) => `${name} (${count})`).join(" + ")
            }
        }

        const basic = makeCells(3)
        const substatsLabels = makeCells(substatNames.length)

        if (substats) {
            substats.optimized.forEach((stat, index) => {
                const i = indexes.get(stat)
                if (i !== undefined) {
                    const value = substats.stats[index]
                    const flat = stats.FlatStats.includes(stat)
                    const strval = flat ? toPlaces(value, 0) : toPlaces(value * 100, 2) + "%"
                    substatsLabels[i] = strval + ` (${substats.rolls[index]})`
                }
            })
            substats.basic.forEach((value, i) => basic[i] = toPlaces(value, 0))
        }
        table.AddRow(
            weapon,
            ...artifacts,
            sets,
            ...basic,
            ...substatsLabels,
            toPlaces(damage, 0),
            toPlaces(relative * 100, 2) + "%"
        )
    }

    return table
}


function makeCells(len: number, ...values: TableCell[]): TableCell[] {
    const cells: TableCell[] = Array.from(Array(len)).fill(undefined)
    for (let i = 0; i < len; i++) {
        cells[i] = values[i]
    }
    return cells
}