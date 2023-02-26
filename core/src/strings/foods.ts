import { food, stats } from "@src/core"
import { Table } from "./table"

export function Food(...foods: (food.Options | food.Food)[]): string {
    const table = new Table("NAME", "STARS", "TYPE", "EFFECTS")

    for (const f of foods) {
        const effects = (() => {
            if (!(f instanceof food.Food)) {
                return f.Effects
                    .map(([stat, min, max]) => (
                        `${stats.stat.Name(stat)}: ${min}-${max}`
                    ))
                    .join(", ")
            } else {
                const rank = f.GetRank()
                return f.Options.Effects.map(([stat, min, max]) => {
                    const value = min + (max - min) * (rank - 1) / 2
                    return `${stats.stat.Name(stat)}: ${value}`
                }).join(", ")
            }
        })()
        table.AddRow(f.Name, f.Stars, f.Type, effects)
    }

    return table.String()
}