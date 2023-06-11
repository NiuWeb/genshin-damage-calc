import { stats } from "@src/core"

const statNames = new Map<string, number>()

stats.stat.Values().forEach(x => {
    const name = stats.stat.Name(x).toLowerCase()
    statNames.set(name, x)
})

statNames.set("hp", stats.stat.HP_FLAT)
statNames.set("hp%", stats.stat.HP_PERCENT)
statNames.set("atk", stats.stat.ATK_FLAT)
statNames.set("atk%", stats.stat.ATK_PERCENT)
statNames.set("def", stats.stat.DEF_FLAT)
statNames.set("def%", stats.stat.DEF_PERCENT)
statNames.set("er", stats.stat.ENERGY_RECHARGE)
statNames.set("em", stats.stat.ELEMENTAL_MASTERY)
statNames.set("cr", stats.stat.CRIT_RATE)
statNames.set("cd", stats.stat.CRIT_DMG)
statNames.set("cdmg", stats.stat.CRIT_DMG)

stats.Elements.forEach(x => {
    const name = stats.stat.Name(x).toLowerCase().replace(/_?dmg/ig, "")
    statNames.set(name, x)
})

const keys = Array.from(statNames.keys())

export function getStatNames() {
    return keys
}

export function getStat(name: string) {
    return statNames.get(name)
}