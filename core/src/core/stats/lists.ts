import { aura } from "./aura"
import { stat } from "./stat"
/**
 * Elemental DMG stats INCLUDING physical dmg
 */
export const Elements = [
    stat.PYRO_DMG,
    stat.CRYO_DMG,
    stat.HYDRO_DMG,
    stat.ELECTRO_DMG,
    stat.ANEMO_DMG,
    stat.GEO_DMG,
    stat.DENDRO_DMG,
    stat.PHYSICAL_DMG,
] as const

/**
 * List of all available mainstats
 */
export const Mainstats = [
    stat.HP_FLAT,
    stat.ATK_FLAT,
    stat.ATK_PERCENT,
    stat.HP_PERCENT,
    stat.DEF_PERCENT,
    stat.ENERGY_RECHARGE,
    stat.ELEMENTAL_MASTERY,
    stat.PYRO_DMG,
    stat.CRYO_DMG,
    stat.HYDRO_DMG,
    stat.ELECTRO_DMG,
    stat.ANEMO_DMG,
    stat.GEO_DMG,
    stat.DENDRO_DMG,
    stat.PHYSICAL_DMG,
    stat.CRIT_RATE,
    stat.CRIT_DMG,
    stat.HEALING_BONUS,
] as const

/**
 * List of all available substats
 */
export const Substats = [
    stat.DEF_FLAT,
    stat.HP_FLAT,
    stat.ATK_FLAT,
    stat.ATK_PERCENT,
    stat.HP_PERCENT,
    stat.DEF_PERCENT,
    stat.ENERGY_RECHARGE,
    stat.ELEMENTAL_MASTERY,
    stat.CRIT_RATE,
    stat.CRIT_DMG,
] as const

/** List of all flat stats */
export const FlatStats = [
    stat.SHIELDED,
    stat.DEF,
    stat.DEF_BASE,
    stat.DEF_FLAT,
    stat.HP,
    stat.HP_BASE,
    stat.HP_FLAT,
    stat.ATK,
    stat.ATK_BASE,
    stat.ATK_FLAT,
    stat.ELEMENTAL_MASTERY,
    stat.DMG_FLAT,
    stat.LEVEL,
    stat.ASCENSION,
    stat.NORMAL_ATTACK_LEVEL,
    stat.ELEMENTAL_SKILL_LEVEL,
    stat.ELEMENTAL_BURST_LEVEL,
    stat.NORMAL_ATTACK_LEVEL_UP,
    stat.ELEMENTAL_SKILL_LEVEL_UP,
    stat.ELEMENTAL_BURST_LEVEL_UP,
    stat.NORMAL_ATTACK_ATK_FLAT,
    stat.CHARGED_ATTACK_ATK_FLAT,
    stat.PLUNGE_ATTACK_ATK_FLAT,
    stat.AIMED_SHOT_ATK_FLAT,
    stat.CHARGED_AIMED_SHOT_ATK_FLAT,
    stat.ELEMENTAL_SKILL_ATK_FLAT,
    stat.ELEMENTAL_BURST_ATK_FLAT,
    stat.PYRO_ATK_FLAT,
    stat.CRYO_ATK_FLAT,
    stat.ELECTRO_ATK_FLAT,
    stat.HYDRO_ATK_FLAT,
    stat.GEO_ATK_FLAT,
    stat.ANEMO_ATK_FLAT,
    stat.DENDRO_ATK_FLAT,
    stat.PHYSICAL_DMG_FLAT,
    stat.NORMAL_ATTACK_DMG_FLAT,
    stat.CHARGED_ATTACK_DMG_FLAT,
    stat.PLUNGE_ATTACK_DMG_FLAT,
    stat.AIMED_SHOT_DMG_FLAT,
    stat.CHARGED_AIMED_SHOT_DMG_FLAT,
    stat.ELEMENTAL_SKILL_DMG_FLAT,
    stat.ELEMENTAL_BURST_DMG_FLAT,
    stat.PYRO_DMG_FLAT,
    stat.CRYO_DMG_FLAT,
    stat.ELECTRO_DMG_FLAT,
    stat.HYDRO_DMG_FLAT,
    stat.GEO_DMG_FLAT,
    stat.ANEMO_DMG_FLAT,
    stat.DENDRO_DMG_FLAT,
    stat.PHYSICAL_DMG_FLAT,
] as const

/** Auras that can be swirled */
export const Swirlable = [
    aura.CRYO,
    aura.PYRO,
    aura.HYDRO,
    aura.ELECTRO,
    aura.FROZEN,
] as const