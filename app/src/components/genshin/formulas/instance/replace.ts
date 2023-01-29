import { FormulaProps } from "@src/components/formula/type"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { differentColor } from "@src/utils/difcols"
import { toPlaces } from "@src/utils/number"

const allStats = [
    genshin.stats.stat.ATK,
    genshin.stats.stat.DEF,
    genshin.stats.stat.HP,
    genshin.stats.stat.ELEMENTAL_MASTERY,
    genshin.stats.stat.DMG_FLAT,
].map(stat => [genshin.stats.stat.Name(stat), stat] as [name: string, value: number])
export function getInstanceReplace(
    instance: genshin.instance.Instance,
    stats: genshin.formula.DamageStats,
): FormulaProps["replace"] {

    const multiplier = instance.Base
        .GetMultipliers()
        .filter(s => s.Enabled)
        .map(s => s.Value)
        .reduce((a, b) => a * b, 1)

    const colors = differentColor()

    const result: FormulaProps["replace"] = {
        damage: {
            value: GetString("LABEL.DAMAGE"),
        },
        quicken: {
            value: GetString("LABEL.DAMAGE_QUICKEN"),
        },
        multiplier: {
            value: toPlaces(multiplier * 100, 2) + "%",
            legend: GetString("LABEL.DMG_BASE_MULTIPLIER"),
            style: colors.Next(),
        },
        Dmg: {
            value: toPlaces(stats.Dmg * 100, 2) + "%",
            className: "px-1",
            style: colors.Next(),
            legend: GetString("LABEL.DMG_BONUS")
        },
        Res: {
            value: toPlaces(stats.Res * 100, 2) + "%",
            className: "px-1",
            style: colors.Next(),
            legend: GetString("LABEL.ENEMY_RES")
        },
        Amp: {
            value: toPlaces(stats.Amp * 100, 2) + "%",
            className: "px-1",
            style: colors.Next(),
            legend: GetString("LABEL.DMG_AMP_BONUS")
        },
        Quicken: {
            value: toPlaces(stats.Quicken * 100, 2) + "%",
            className: "px-1",
            style: colors.Next(),
            legend: GetString("LABEL.DMG_QUICKEN_BONUS")
        },
        Tr: {
            value: toPlaces(stats.Tr * 100, 2) + "%",
            className: "px-1",
            style: colors.Next(),
            legend: GetString("LABEL.DMG_TR_BONUS")
        },
        Char: {
            value: stats.Char,
            className: "px-1",
            style: colors.Next(),
            legend: GetString("LABEL.CHARACTER_LEVEL"),
        },
        Enemy: {
            value: stats.Enemy,
            className: "px-1",
            style: colors.Next(),
            legend: GetString("LABEL.ENEMY_LEVEL"),
        },
        Ignored: {
            value: toPlaces(stats.Ignored * 100, 2) + "%",
            legend: GetString("STAT.DEFIGNORED"),
            className: "px-1",
            style: colors.Next(),
        },
        Reduced: {
            value: toPlaces(stats.Reduced * 100, 2) + "%",
            legend: GetString("STAT.DEFREDUCTION"),
            className: "px-1",
            style: colors.Next(),
        },
        Critrate: {
            value: toPlaces(stats.Critrate * 100, 2) + "%",
            legend: GetString("STAT.CRIT_RATE"),
            className: "px-1",
            style: colors.Next(),
        },
        Critdmg: {
            value: toPlaces(stats.Critdmg * 100, 2) + "%",
            legend: GetString("STAT.CRIT_DMG"),
            className: "px-1",
            style: colors.Next(),
        }
    }

    for (const [name, stat] of allStats) {
        const val = instance.Get(stat)
        result[name] = {
            value: genshin.stats.FlatStats.includes(stat) ?
                val.toFixed(0) :
                toPlaces(val * 100, 2) + "%",
            legend: GetString("STAT." + name),
            className: "px-1",
            style: colors.Next(),
        }
    }

    return result
}