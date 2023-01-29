import { genshin } from "@src/genshin/core"

const stat = genshin.stats.stat
const initial = new Set(stat.Values())

const groups: { readonly [group: string]: number[] } = {
    BASIC: [
        stat.ATK,
        stat.HP,
        stat.DEF,
        stat.ENERGY_RECHARGE,
        stat.ELEMENTAL_MASTERY,
        stat.CRIT_RATE,
        stat.EXTRA_CRIT_RATE,
        stat.CRIT_DMG,
        stat.HEALING_BONUS,
        stat.DMG_FLAT,
        stat.ALL_DMG,
        stat.DEFIGNORED,
    ],
    REACTION_DMG: [],
    ELEMENTAL_DMG: [],
    ELEMENTAL_CRIT_DMG: [],
    ELEMENTAL_CRIT_RATE: [],
    ELEMENTAL_DMG_FLAT: [],
    ELEMENTAL_ATK_PERCENT: [],
    ELEMENTAL_ATK_FLAT: [],
    TALENT_DMG: [],
    TALENT_CRIT_DMG: [],
    TALENT_CRIT_RATE: [],
    TALENT_DMG_FLAT: [],
    TALENT_ATK_PERCENT: [],
    TALENT_ATK_FLAT: [],
    Z_OTHER: [],
}
groups["BASIC"].forEach(b => initial.delete(b))

function createGroups(prefix: string, stats: readonly number[]) {
    for (const el of stats) {
        const name = stat.Name(el)
        const cr = stat.Get(name.replace(/_dmg/i, "_CRIT_RATE"))
        const cd = stat.Get(name.replace(/_dmg/i, "_CRIT_DMG"))
        const atkp = stat.Get(name.replace(/_dmg/i, "_ATK_PERCENT"))
        const atkf = stat.Get(name.replace(/_dmg/i, "_ATK_FLAT"))
        const flat = stat.Get(name.replace(/_dmg/i, "_DMG_FLAT"))

        initial.delete(el)
        initial.delete(cr)
        initial.delete(cd)
        initial.delete(atkp)
        initial.delete(atkf)
        initial.delete(flat)

        groups[prefix + "_DMG"].push(el)
        groups[prefix + "_CRIT_DMG"].push(cd)
        groups[prefix + "_CRIT_RATE"].push(cr)
        groups[prefix + "_DMG_FLAT"].push(flat)
        groups[prefix + "_ATK_PERCENT"].push(atkp)
        groups[prefix + "_ATK_FLAT"].push(atkf)
    }
}

createGroups("ELEMENTAL", genshin.stats.Elements)
createGroups("TALENT", [
    stat.NORMAL_ATTACK_DMG,
    stat.CHARGED_ATTACK_DMG,
    stat.AIMED_SHOT_DMG,
    stat.CHARGED_AIMED_SHOT_DMG,
    stat.PLUNGE_ATTACK_DMG,
    stat.ELEMENTAL_SKILL_DMG,
    stat.ELEMENTAL_BURST_DMG,
])


for (const reaction of [
    stat.VAPORIZE_DMG,
    stat.MELT_DMG,
    stat.AGGRAVATE_DMG,
    stat.SPREAD_DMG,
    stat.OVERLOAD_DMG,
    stat.SUPERCONDUCT_DMG,
    stat.ELECTROCHARGE_DMG,
    stat.SHATTER_DMG,
    stat.SWIRL_DMG,
    stat.BLOOM_DMG,
    stat.HYPERBLOOM_DMG,
    stat.BURGEON_DMG,
    stat.BURNING_DMG,
]) {
    initial.delete(reaction)
    groups["REACTION_DMG"].push(reaction)
}

for (const s of initial) {
    groups["Z_OTHER"].push(s)
}

export const Groups = Object.entries(groups)