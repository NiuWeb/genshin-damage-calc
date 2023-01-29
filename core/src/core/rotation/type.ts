/** A single rotation action */
export interface Action {
    /** 
     * a function to trigger on this action. 
     * This is exclusive with the hit, so if
     * a function is defined, the hit won't
     * be triggered.
     */
    fn?(): void
    /** a hit in the rotation */
    hit?: {
        /** character name to get the hit from */
        charname: string
        /** name of the hit to get */
        hitname: string
        /** hit damage final multiplier */
        multiplier: number
        /** hit aura uptime (of the enemy) */
        aura: number
        /** hit reaction uptime (of the enemy) */
        reaction: number
    }
    /** logger line */
    line?: number
}
/** a register of a hit */
export interface Register {
    charname: string
    hitname: string
    talent: number
    element: number
    damage: number
    single_damage: number
    multiplier: number
    noaura_noreaction: number
    noaura_yesreaction: number
    yesaura_noreaction: number
    yesaura_yesreaction: number
    aura: number
    reaction: number
    auras: readonly number[]
}

/** Hit-by-hit register grouped by characters */
export type Details = {
    [charname: string]: (Register | undefined)[]
}

/** relative damage */
export interface Portion {
    /** total damage */
    damage: number
    /** relative (%) damage */
    relative: number
}

/** rotation damage summary */
export interface Summary {
    /** rotation total damage */
    damage: number
    /**rotation total dps */
    dps: number
    /** rotation duration, in seconds */
    duration: number
    characters: {
        [character: string]: CharacterSummary
    }
}

/** Rotation damage summary by character */
export interface CharacterSummary {
    /** total damage */
    damage: number
    /** total dps */
    dps: number
    /** character relative (%) damage */
    relative: number
    /** total damage by element */
    elements: {
        [element: number]: Portion
    }
    /** total damage by talent */
    talents: {
        [talent: number]: Portion
    }
    /** total damage by damage instances */
    instances: {
        [instance: string]: Portion
    }
}