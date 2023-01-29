export interface GOOD {
    format: "GOOD" // A way for people to recognize this format.
    version: number // GOOD API version.
    source: string // The app that generates this data.
    artifacts?: Artifact[]
}

export interface Artifact {
    setKey: string
    slotKey: SlotKey //e.g. "plume"
    level: number //0-20 inclusive
    rarity: number //1-5 inclusive
    mainStatKey: StatKey
    lock: boolean //Whether the artifact is locked in game.
    substats: Substat[]
}

interface Substat {
    key: StatKey //e.g. "critDMG_"
    value: number //e.g. 19.4
}

export type SlotKey = "flower" | "plume" | "sands" | "goblet" | "circlet"

export type StatKey
    = "hp" //HP
    | "hp_" //HP%
    | "atk" //ATK
    | "atk_" //ATK%
    | "def" //DEF
    | "def_" //DEF%
    | "eleMas" //Elemental Mastery
    | "enerRech_" //Energy Recharge
    | "heal_" //Healing Bonus
    | "critRate_" //Crit Rate
    | "critDMG_" //Crit DMG
    | "physical_dmg_" //Physical DMG Bonus
    | "anemo_dmg_" //Anemo DMG Bonus
    | "geo_dmg_" //Geo DMG Bonus
    | "electro_dmg_" //Electro DMG Bonus
    | "hydro_dmg_" //Hydro DMG Bonus
    | "pyro_dmg_" //Pyro DMG Bonus
    | "cryo_dmg_" //Cryo DMG Bonus
    | "dendro_dmg_" //Dendro DMG Bonus