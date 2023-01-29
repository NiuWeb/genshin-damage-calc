import { Character } from "@core/character"
import { stat } from "@core/stats"
import { ASCENSION_MULTIPLIER, BONUS_ASCENSION_MULTIPLIER, BONUS_STAT_4, BONUS_STAT_5, CHARACTER_ATTRIBUTE_4, CHARACTER_ATTRIBUTE_5 } from "./character_data"

/** 
 * Character scaling data
 * Get scaling values from the wiki:
 * https://genshin-impact.fandom.com/wiki/Level_Scaling/Character
 */
export interface CharacterScaling {
    /** scaling arrays (each index multiplies its corresponding level) */
    Scaling?: readonly number[]
    /** Initial values for HP base */
    HpBase: readonly [initial: number, ascension: number]
    /** Initial values for ATK base */
    AtkBase: readonly [initial: number, ascension: number]
    /** Initial values for DEF base */
    DefBase: readonly [initial: number, ascension: number]
    /** Stat bonus gained in ascensions */
    StatBonus: number
}

/** Initialize the base stats scaling triggered by level/ascension change */
export function AddCharacterScaling(character: Character, scaling: CharacterScaling): Character {
    const atk = character.CreateModifier(stat.ATK_BASE, 0)
    const def = character.CreateModifier(stat.DEF_BASE, 0)
    const hp = character.CreateModifier(stat.HP_BASE, 0)

    const bonus = character.CreateModifier(scaling.StatBonus, 0)

    if (!scaling.Scaling) {
        if (character.Options.Stars === 4) {
            scaling.Scaling = CHARACTER_ATTRIBUTE_4
        } else {
            scaling.Scaling = CHARACTER_ATTRIBUTE_5
        }
    }
    const sc = scaling.Scaling
    const updater = () => {
        atk.SetValue(baseValue(
            sc,
            scaling.AtkBase[0],
            scaling.AtkBase[1],
            character.GetLevel(),
            character.GetAscension(),
        ))
        def.SetValue(baseValue(
            sc,
            scaling.DefBase[0],
            scaling.DefBase[1],
            character.GetLevel(),
            character.GetAscension(),
        ))
        hp.SetValue(baseValue(
            sc,
            scaling.HpBase[0],
            scaling.HpBase[1],
            character.GetLevel(),
            character.GetAscension(),
        ))
        bonus.SetValue(bonusValue(
            character.Options.Stars,
            scaling.StatBonus,
            character.GetAscension(),
        ))
    }

    updater()

    character.CreateObserver(stat.LEVEL, updater)
    character.CreateObserver(stat.ASCENSION, updater)

    return character
}


/** Gets the level multiplier for attribute scaling (atk, def, hp) */
function baseLv(scaling: readonly number[], level: number): number {
    return scaling[level - 1]
}

/** Gets the ascension value for attribute scaling (atk, def, hp) */
function baseAsc(ascension: number): number {
    const index = ascension - 1
    if (index < 0) {
        return 0
    }
    return ASCENSION_MULTIPLIER[index]
}

/**
 * Calculates the value of the character's basic attribute.
 * @param base the base value at level 1.
 * @param asc the maximun ascension value.
 * @param level the character level.
 * @param ascended Whether the character is ascended or not
*/
function baseValue(scaling: readonly number[], base: number, asc: number, level: number, ascension: number): number {
    return base * baseLv(scaling, level) + asc * baseAsc(ascension)
}

/** Gets the bonus value at a given ascension */
function bonusValue(stars: number, stat: number, ascension: number): number {
    const index = ascension - 1
    if (index < 0) {
        return 0
    }
    if (stars === 4) {
        return BONUS_STAT_4[stat] * BONUS_ASCENSION_MULTIPLIER[index]
    } else {
        return BONUS_STAT_5[stat] * BONUS_ASCENSION_MULTIPLIER[index]
    }
}
