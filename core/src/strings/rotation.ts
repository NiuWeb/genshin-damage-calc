import { rotation, stats } from "@src/core"
import { Horizontal } from "./horizontal"
import { labels } from "./labels"
import { Table } from "./table"

export function Rotation(summary: rotation.Summary): string {

    const results = Object.keys(summary.characters).map(charname => (
        charname + "\n" + _character(charname, summary.characters[charname])
    ))
    const final: string[] = []
    for (let i = 0; i < results.length; i++) {
        final[2 * i] = results[i]
        final[2 * i + 1] = " ".repeat(4)
    }

    return `${labels.ROTATION_DAMAGE}: ${summary.damage.toFixed(2)}\n\n` +
        `${labels.DPS}: ${summary.dps.toFixed(2)}\n\n` +
        Horizontal(...final)
}

function _character(name: string, summary: rotation.CharacterSummary): string {
    const result = new Table(labels.NAME, labels.DAMAGE, labels.RELATIVE)
    result.AddRow(name, summary.damage, percent(summary.relative))

    for (const key in summary.elements) {
        const stat = parseInt(key)
        result.AddRow(stats.stat.Name(stat), summary.elements[key].damage, percent(summary.elements[key].relative))
    }
    for (const key in summary.talents) {
        const stat = parseInt(key)
        result.AddRow(stats.stat.Name(stat), summary.talents[key].damage, percent(summary.talents[key].relative))
    }
    for (const key in summary.instances) {
        result.AddRow(key, summary.instances[key].damage, percent(summary.instances[key].relative))
    }

    return result.toString()
}

const percent = (x: number) => x * 100