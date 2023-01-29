/** key for propMap */
export interface PropMapKey {
    type: number
    val: string
}
/** weapon or artifact */
export type ItemType = "ITEM_WEAPON" | "ITEM_RELIQUARY"

/** artifact piece */
export type EquipType =
    "EQUIP_BRACER" |
    "EQUIP_NECKLACE" |
    "EQUIP_SHOES" |
    "EQUIP_RING" |
    "EQUIP_DRESS"

/** Basic data for a weapon */
export interface WeaponBasic {
    /** weapon level */
    level: number
    /** weapon ascension */
    promoteLevel: number
    /** weapon rank values [0-4] */
    affixMap: {
        [prop: string]: number
    }
}

/** Basic data for an artifact */
export interface ArtifactBasic {
    /** Artifact level [1-21] */
    level: number
}
/** Mainstat definition */
export interface Mainstat {
    /** Mainstat id */
    mainPropId: string
    /** Mainstat value */
    statValue: number
}
/** Substat definition */
export interface Substat {
    /** Substat id */
    appendPropId: string
    /** Substat value */
    statValue: number
}
/** details of an equipment item */
export interface EquipItemFlat {
    /** code for name string */
    nameTextMapHash: string
    /** rarity (stars) */
    rankLevel: number
    /** code for artifact set name string */
    setNameTextMapHash?: string
    /** weapon or artifact */
    itemType: ItemType

    /** artifact mainstat */
    reliquaryMainstat?: Mainstat
    /** artifact substats */
    reliquarySubstats?: Substat[]

    /** artifact piece */
    equipType?: EquipType
}
/** Equipment item (weapon or artifact) */
export interface EquipItem {
    itemId: number
    /** details of the item if it's a weapon */
    weapon?: WeaponBasic
    /** details of the item if it's an artifact */
    reliquary?: ArtifactBasic
    /** details of the item */
    flat: EquipItemFlat
}

/** character data in enka format */
export interface AvatarInfo {
    /** character ID */
    avatarId: number
    /** character basic stats (level, ascension) */
    propMap: {
        [prop: string]: PropMapKey
    }
    /** character damage stats */
    fightPropMap: {
        [prop: string]: number
    }
    /** character talent levels without constellations/extra levels */
    skillLevelMap: {
        [prop: string]: number
    }

    /** equipment items */
    equipList: EquipItem[]
}

/** enka data */
export interface Enka {
    /** loaded characters */
    avatarInfoList: AvatarInfo[]
}