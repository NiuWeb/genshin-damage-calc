/**
 all final stats required to calculate damage
*/
export interface DamageStats {
    /**
     character level
    */
    Char: number
    /**
     Enemy level
    */
    Enemy: number
    /**
     Base damage
    */
    Base: number
    /**
     All non-transformative DMG bonus
    */
    Dmg: number
    /**
     CRIT Rate
    */
    Critrate: number
    /**
     CRIT DMG
    */
    Critdmg: number
    /**
     Elemental Mastery
    */
    Em: number
    /**
     RES value
    */
    Res: number
    /**
     DEF Ignored
    */
    Ignored: number
    /**
     DEF reduction
    */
    Reduced: number
    /**
     Quicken DMG bonus
    */
    Quicken: number
    /**
     Amplifying DMG bonus
    */
    Amp: number
    /**
     Transformative DMG bonus
    */
    Tr: number
}

/**
 options for damage calculations
*/
export interface DamageOptions {
    /**
     include Base damage
    */
    Base: boolean
    /**
     include Def multiplier
    */
    Def: boolean
    /**
     include Res multiplier
    */
    Res: boolean
    /**
     include non-transformative damage bonus
    */
    Dmg: boolean
    /**
     Crit type
    */
    Crit: CritType
    /**
     Quicken reaction type
    */
    Quicken: QuickenType
    /**
     transformative reaction type
    */
    Tr: number
    /**
     amplifying reaction type
    */
    Amp: AmpType
}

/**
 Type of CRIT Damage
*/
export enum CritType {
    NO_CRIT,
    CRIT,
    CRIT_AVG,
}

/**
 Type of amplifying reaction
*/
export enum AmpType {
    AMP_STRONG = 2,
    AMP_WEAK = 1.5,
    AMP_NONE = 0,
}

/**
 Type of quicken reaction
*/
export enum QuickenType {
    QUICKEN_STRONG = 2.5,
    QUICKEN_WEAK = 2.3,
    QUICKEN_NONE = 0,
}

/**
 * Creates a damage stats object with 0 as default value for each property
 */
export function DamageStats(opts: Partial<DamageStats>): DamageStats {
    return {
        Char: 0,
        Enemy: 0,
        Base: 0,
        Dmg: 0,
        Critrate: 0,
        Critdmg: 0,
        Em: 0,
        Res: 0,
        Ignored: 0,
        Reduced: 0,
        Quicken: 0,
        Amp: 0,
        Tr: 0,
        ...opts
    }
}

/**
 * Creates a damage options object with 0 as default value for each property
 */
export function DamageOptions(opts: Partial<DamageOptions>): DamageOptions {
    return {
        Base: false,
        Def: false,
        Res: false,
        Dmg: false,
        Crit: CritType.NO_CRIT,
        Quicken: QuickenType.QUICKEN_NONE,
        Tr: 0,
        Amp: AmpType.AMP_NONE,
        ...opts,
    }
}