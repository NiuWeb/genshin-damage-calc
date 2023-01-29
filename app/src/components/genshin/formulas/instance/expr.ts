import { genshin } from "@src/genshin/core"
import { toPlaces } from "@src/utils/number"


function TrBase(base: number, lvl: number): string {
    let formula = toPlaces(base * 100, 2) + "%*"
    formula += toPlaces(genshin.formula.TrBase(lvl), 2)
    return formula
}

export function getInstanceExpr(
    instance: genshin.instance.Instance,
    stats: genshin.formula.DamageStats,
    options: genshin.formula.DamageOptions,
): string {
    let formula = ""

    if (options.Quicken !== genshin.formula.QuickenType.QUICKEN_NONE) {
        formula += "quicken &= "
        formula += TrBase(options.Quicken, stats.Char)
        formula += "\n&*(1+5*ELEMENTAL_MASTERY/(ELEMENTAL_MASTERY+1200)+ Quicken)"
        formula += "\n\n"
    }

    if (options.Tr) {
        formula += "damage &= (\n&("
    } else {
        formula += "damage &= ("
    }

    // base damage
    if (options.Base) {
        const mvs = instance.Base
            .GetMvs()
            .filter(a => a.Enabled && a.Value > 0 && a.Stat !== genshin.stats.stat.NONE)
            .map(({ Stat, Value }) => {
                return toPlaces(Value * 100, 2) + "%*" + genshin.stats.stat.Name(Stat)
            })
            .join("+")

        formula +=
            "multiplier*(" + mvs + ")+DMG_FLAT"
    }

    if (options.Tr) {
        const base = genshin.formula.TrMultiplier(options.Tr)
        formula += TrBase(base, stats.Char)
    }
    if (!options.Tr && options.Quicken !== genshin.formula.QuickenType.QUICKEN_NONE) {
        formula += "+quicken"
    }

    formula += ")\n"

    if (options.Dmg) {
        formula += "&*(1+Dmg)\n"
    }

    if (options.Tr) {
        formula += "&*(1+ (16*ELEMENTAL_MASTERY/(ELEMENTAL_MASTERY+2000)) + Tr)\n"
        if (options.Quicken !== genshin.formula.QuickenType.QUICKEN_NONE) {
            formula += "&+quicken\n&)\n"
        } else {
            formula += "&)\n"
        }
    }

    if (options.Crit === genshin.formula.CritType.CRIT) {
        formula += "&*(1+Critdmg)\n"
    } else if (options.Crit === genshin.formula.CritType.CRIT_AVG) {
        formula += "&*(1+Critrate*Critdmg)\n"
    }

    if (options.Def) {
        formula += "&*(Char+100)/((1-Ignored)*(1-Reduced)*(Enemy+100)+Char+100)\n"
    }

    if (options.Res) {
        if (stats.Res < 0) {
            formula += "&*(1-Res/2)\n"
        } else if (stats.Res < 0.75) {
            formula += "&*(1-Res)\n"
        } else {
            formula += "&*1/(4*Res + 1)\n"
        }
    }

    if (options.Amp > 0) {
        const amp = toPlaces(options.Amp * 100, 2)
        formula += `&*${amp}%*(1+2.78*ELEMENTAL_MASTERY/(ELEMENTAL_MASTERY+1400) + Amp)\n`
    }

    return formula
}