import { stats } from "@src/core"
import { SlotKey, StatKey } from "./type"

export const MapPieces: { [good in SlotKey]: number } = {
    flower: stats.piece.FLOWER,
    plume: stats.piece.PLUME,
    sands: stats.piece.SANDS,
    goblet: stats.piece.GOBLET,
    circlet: stats.piece.CIRCLET
}

export const MapStats: { [good in StatKey]: number } = {
    hp: stats.stat.HP_FLAT,
    hp_: stats.stat.HP_PERCENT,
    atk: stats.stat.ATK_FLAT,
    atk_: stats.stat.ATK_PERCENT,
    def: stats.stat.DEF_FLAT,
    def_: stats.stat.DEF_PERCENT,
    eleMas: stats.stat.ELEMENTAL_MASTERY,
    enerRech_: stats.stat.ENERGY_RECHARGE,
    heal_: stats.stat.HEALING_BONUS,
    critRate_: stats.stat.CRIT_RATE,
    critDMG_: stats.stat.CRIT_DMG,
    physical_dmg_: stats.stat.PHYSICAL_DMG,
    anemo_dmg_: stats.stat.ANEMO_DMG,
    geo_dmg_: stats.stat.GEO_DMG,
    electro_dmg_: stats.stat.ELECTRO_DMG,
    hydro_dmg_: stats.stat.HYDRO_DMG,
    pyro_dmg_: stats.stat.PYRO_DMG,
    cryo_dmg_: stats.stat.CRYO_DMG,
    dendro_dmg_: stats.stat.DENDRO_DMG
}