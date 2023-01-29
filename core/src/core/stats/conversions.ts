import { stat as s } from "./stat"
import { aura as a } from "./aura"
import { piece as p } from "./piece"
import { Elements } from "./lists"

/**
 Converts an elemental or talent dmg to its corresponding atk percent
*/
export function DmgToAtkPercent(stat: number): number {
    switch (stat) {
        case s.PYRO_DMG:
            return s.PYRO_ATK_PERCENT
        case s.HYDRO_DMG:
            return s.HYDRO_ATK_PERCENT
        case s.CRYO_DMG:
            return s.CRYO_ATK_PERCENT
        case s.ELECTRO_DMG:
            return s.ELECTRO_ATK_PERCENT
        case s.ANEMO_DMG:
            return s.ANEMO_ATK_PERCENT
        case s.GEO_DMG:
            return s.GEO_ATK_PERCENT
        case s.DENDRO_DMG:
            return s.DENDRO_ATK_PERCENT
        case s.PHYSICAL_DMG:
            return s.PHYSICAL_ATK_PERCENT
        case s.NORMAL_ATTACK_DMG:
            return s.NORMAL_ATTACK_ATK_PERCENT
        case s.CHARGED_ATTACK_DMG:
            return s.CHARGED_ATTACK_ATK_PERCENT
        case s.AIMED_SHOT_DMG:
            return s.AIMED_SHOT_ATK_PERCENT
        case s.CHARGED_AIMED_SHOT_DMG:
            return s.CHARGED_AIMED_SHOT_ATK_PERCENT
        case s.PLUNGE_ATTACK_DMG:
            return s.PLUNGE_ATTACK_ATK_PERCENT
        case s.ELEMENTAL_SKILL_DMG:
            return s.ELEMENTAL_SKILL_ATK_PERCENT
        case s.ELEMENTAL_BURST_DMG:
            return s.ELEMENTAL_BURST_ATK_PERCENT
    }
    return s.NONE
}
/**
 Converts an elemental or talent dmg to its corresponding flat dmg
*/
export function DmgToFlatDmg(stat: number): number {
    switch (stat) {
        case s.PYRO_DMG:
            return s.PYRO_DMG_FLAT
        case s.HYDRO_DMG:
            return s.HYDRO_DMG_FLAT
        case s.CRYO_DMG:
            return s.CRYO_DMG_FLAT
        case s.ELECTRO_DMG:
            return s.ELECTRO_DMG_FLAT
        case s.ANEMO_DMG:
            return s.ANEMO_DMG_FLAT
        case s.GEO_DMG:
            return s.GEO_DMG_FLAT
        case s.DENDRO_DMG:
            return s.DENDRO_DMG_FLAT
        case s.PHYSICAL_DMG:
            return s.PHYSICAL_DMG_FLAT
        case s.NORMAL_ATTACK_DMG:
            return s.NORMAL_ATTACK_DMG_FLAT
        case s.CHARGED_ATTACK_DMG:
            return s.CHARGED_ATTACK_DMG_FLAT
        case s.AIMED_SHOT_DMG:
            return s.AIMED_SHOT_DMG_FLAT
        case s.CHARGED_AIMED_SHOT_DMG:
            return s.CHARGED_AIMED_SHOT_DMG_FLAT
        case s.PLUNGE_ATTACK_DMG:
            return s.PLUNGE_ATTACK_DMG_FLAT
        case s.ELEMENTAL_SKILL_DMG:
            return s.ELEMENTAL_SKILL_DMG_FLAT
        case s.ELEMENTAL_BURST_DMG:
            return s.ELEMENTAL_BURST_DMG_FLAT
    }
    return s.NONE
}

/**
 Converts an elemental or talent dmg to its corresponding atk flat
*/
export function DmgToAtkFlat(stat: number): number {
    switch (stat) {
        case s.PYRO_DMG:
            return s.PYRO_ATK_FLAT
        case s.HYDRO_DMG:
            return s.HYDRO_ATK_FLAT
        case s.CRYO_DMG:
            return s.CRYO_ATK_FLAT
        case s.ELECTRO_DMG:
            return s.ELECTRO_ATK_FLAT
        case s.ANEMO_DMG:
            return s.ANEMO_ATK_FLAT
        case s.GEO_DMG:
            return s.GEO_ATK_FLAT
        case s.DENDRO_DMG:
            return s.DENDRO_ATK_FLAT
        case s.PHYSICAL_DMG:
            return s.PHYSICAL_ATK_FLAT
        case s.NORMAL_ATTACK_DMG:
            return s.NORMAL_ATTACK_ATK_FLAT
        case s.CHARGED_ATTACK_DMG:
            return s.CHARGED_ATTACK_ATK_FLAT
        case s.AIMED_SHOT_DMG:
            return s.AIMED_SHOT_ATK_FLAT
        case s.CHARGED_AIMED_SHOT_DMG:
            return s.CHARGED_AIMED_SHOT_ATK_FLAT
        case s.PLUNGE_ATTACK_DMG:
            return s.PLUNGE_ATTACK_ATK_FLAT
        case s.ELEMENTAL_SKILL_DMG:
            return s.ELEMENTAL_SKILL_ATK_FLAT
        case s.ELEMENTAL_BURST_DMG:
            return s.ELEMENTAL_BURST_ATK_FLAT
    }
    return s.NONE
}

/**
 Converts an elemental or talent dmg to its corresponding crit rate
*/
export function DmgToCritRate(stat: number): number {
    switch (stat) {
        case s.PYRO_DMG:
            return s.PYRO_CRIT_RATE
        case s.HYDRO_DMG:
            return s.HYDRO_CRIT_RATE
        case s.CRYO_DMG:
            return s.CRYO_CRIT_RATE
        case s.ELECTRO_DMG:
            return s.ELECTRO_CRIT_RATE
        case s.ANEMO_DMG:
            return s.ANEMO_CRIT_RATE
        case s.GEO_DMG:
            return s.GEO_CRIT_RATE
        case s.DENDRO_DMG:
            return s.DENDRO_CRIT_RATE
        case s.PHYSICAL_DMG:
            return s.PHYSICAL_CRIT_RATE
        case s.NORMAL_ATTACK_DMG:
            return s.NORMAL_ATTACK_CRIT_RATE
        case s.CHARGED_ATTACK_DMG:
            return s.CHARGED_ATTACK_CRIT_RATE
        case s.AIMED_SHOT_DMG:
            return s.AIMED_SHOT_CRIT_RATE
        case s.CHARGED_AIMED_SHOT_DMG:
            return s.CHARGED_AIMED_SHOT_CRIT_RATE
        case s.PLUNGE_ATTACK_DMG:
            return s.PLUNGE_ATTACK_CRIT_RATE
        case s.ELEMENTAL_SKILL_DMG:
            return s.ELEMENTAL_SKILL_CRIT_RATE
        case s.ELEMENTAL_BURST_DMG:
            return s.ELEMENTAL_BURST_CRIT_RATE
    }
    return s.NONE
}

/**
 Converts an elemental or talent dmg to its corresponding crit dmg
*/
export function DmgToCritDmg(stat: number): number {
    switch (stat) {
        case s.PYRO_DMG:
            return s.PYRO_CRIT_DMG
        case s.HYDRO_DMG:
            return s.HYDRO_CRIT_DMG
        case s.CRYO_DMG:
            return s.CRYO_CRIT_DMG
        case s.ELECTRO_DMG:
            return s.ELECTRO_CRIT_DMG
        case s.ANEMO_DMG:
            return s.ANEMO_CRIT_DMG
        case s.GEO_DMG:
            return s.GEO_CRIT_DMG
        case s.DENDRO_DMG:
            return s.DENDRO_CRIT_DMG
        case s.PHYSICAL_DMG:
            return s.PHYSICAL_CRIT_DMG
        case s.NORMAL_ATTACK_DMG:
            return s.NORMAL_ATTACK_CRIT_DMG
        case s.CHARGED_ATTACK_DMG:
            return s.CHARGED_ATTACK_CRIT_DMG
        case s.AIMED_SHOT_DMG:
            return s.AIMED_SHOT_CRIT_DMG
        case s.CHARGED_AIMED_SHOT_DMG:
            return s.CHARGED_AIMED_SHOT_CRIT_DMG
        case s.PLUNGE_ATTACK_DMG:
            return s.PLUNGE_ATTACK_CRIT_DMG
        case s.ELEMENTAL_SKILL_DMG:
            return s.ELEMENTAL_SKILL_CRIT_DMG
        case s.ELEMENTAL_BURST_DMG:
            return s.ELEMENTAL_BURST_CRIT_DMG
    }
    return s.NONE
}

/**
 Converts an elemental dmg to its corresponding RES
*/
export function DmgToRes(stat: number): number {
    switch (stat) {
        case s.PYRO_DMG:
            return s.PYRO_RES
        case s.HYDRO_DMG:
            return s.HYDRO_RES
        case s.CRYO_DMG:
            return s.CRYO_RES
        case s.ELECTRO_DMG:
            return s.ELECTRO_RES
        case s.ANEMO_DMG:
            return s.ANEMO_RES
        case s.GEO_DMG:
            return s.GEO_RES
        case s.DENDRO_DMG:
            return s.DENDRO_RES
        case s.PHYSICAL_DMG:
            return s.PHYSICAL_RES
    }
    return s.NONE
}

/**
 Converts an aura to an elemental dmg
*/
export function AuraToDmg(aura: number): number {
    switch (aura) {
        case a.PYRO:
            return s.PYRO_DMG
        case a.HYDRO:
            return s.HYDRO_DMG
        case a.CRYO:
            return s.CRYO_DMG
        case a.FROZEN:
            return s.CRYO_DMG
        case a.ELECTRO:
            return s.ELECTRO_DMG
        case a.DENDRO:
            return s.DENDRO_DMG
        case a.QUICKEN:
            return s.DENDRO_DMG
    }
    return s.NONE
}

/**
 Converts an elemental dmg to an aura
*/
export function DmgToAura(element: number): number {
    switch (element) {
        case s.PYRO_DMG:
            return a.PYRO
        case s.HYDRO_DMG:
            return a.HYDRO
        case s.CRYO_DMG:
            return a.CRYO
        case s.ELECTRO_DMG:
            return a.ELECTRO
        case s.DENDRO_DMG:
            return a.DENDRO
    }
    return s.NONE
}

/**
 Converts a transformative reaction to its element
*/
export function TrToDmg(tr: number): number {
    switch (tr) {
        case s.OVERLOAD_DMG:
            return s.PYRO_DMG
        case s.ELECTROCHARGE_DMG:
            return s.ELECTRO_DMG
        case s.SUPERCONDUCT_DMG:
            return s.CRYO_DMG
        case s.SHATTER_DMG:
            return s.PHYSICAL_DMG
        case s.BURNING_DMG:
            return s.PYRO_DMG
        case s.BURGEON_DMG:
            return s.DENDRO_DMG
        case s.BLOOM_DMG:
            return s.DENDRO_DMG
        case s.HYPERBLOOM_DMG:
            return s.DENDRO_DMG
    }
    return s.NONE
}


/** Gets the valid mainstats for a corresponding piece */
export function PieceToMainstats(piece: number): readonly number[] {
    switch (piece) {
        case p.FLOWER:
            return [s.HP_FLAT]
        case p.PLUME:
            return [s.ATK_FLAT]
        case p.SANDS:
            return [
                s.ATK_PERCENT,
                s.HP_PERCENT,
                s.DEF_PERCENT,
                s.ENERGY_RECHARGE,
                s.ELEMENTAL_MASTERY,
            ]
        case p.GOBLET:
            return [
                s.ATK_PERCENT,
                s.HP_PERCENT,
                s.DEF_PERCENT,
                s.ELEMENTAL_MASTERY,
                ...Elements,
            ]
        case p.CIRCLET:
            return [
                s.ATK_PERCENT,
                s.HP_PERCENT,
                s.DEF_PERCENT,
                s.ELEMENTAL_MASTERY,
                s.CRIT_RATE,
                s.CRIT_DMG,
                s.HEALING_BONUS,
            ]
    }
    return []
}
