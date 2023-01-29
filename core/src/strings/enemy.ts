import { enemy, stats } from "@src/core"
import { Horizontal } from "./horizontal"
import { labels } from "./labels"
import { Table } from "./table"

/** Prints enemies as string */
export function Enemy(...enemies: enemy.Enemy[]) {
    const result: string[] = []
    for (let i = 0; i < enemies.length; i++) {
        result[2 * i] = _enemy(enemies[i])
        result[2 * i + 1] = " ".repeat(4)
    }
    return Horizontal(...result)
}


function _enemy(enemy: enemy.Enemy): string {
    const stable = new Table(labels.STAT, labels.STAT_BASE, labels.STAT_TOTAL)
    stable.AddRow(labels.LEVEL, "", enemy.GetLevel())
    for (const dmg of stats.Elements) {
        const res = stats.DmgToRes(dmg)
        stable.AddRow(stats.stat.Name(res), enemy.GetBaseRes(res), enemy.Subject.Get(res))
    }
    const auras = new Table(labels.AURA)
    for (const aura of stats.aura.Values()) {
        if (enemy.HasAura(aura)) {
            auras.AddRow(stats.aura.Name(aura))
        }
    }
    stable.DecimalPlaces = 4
    return enemy.name + "\n" + Horizontal(stable.String(), auras.String())
}