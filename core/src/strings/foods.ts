import { food, stats } from "@src/core";
import { Table } from "./table";

export function Food(...foods: food.Options[]): string {
    const table = new Table("NAME", "STARS", "TYPE", "EFFECTS")

    for (const food of foods) {
        const effects = food.Effects
            .map(([stat, min, max]) => (
                `${stats.stat.Name(stat)}: ${min}-${max}`
            ))
            .join(", ")
        table.AddRow(food.Name, food.Stars, food.Type, effects)
    }

    return table.String()
}