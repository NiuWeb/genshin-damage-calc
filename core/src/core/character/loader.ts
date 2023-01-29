import { Character } from "./character"
import { stat } from "@core/stats"
import { Export as ExportEnemy, Import as ImportEnemy, Exported as ExportedEnemy } from "@core/enemy"

/** Exported character */
export interface Exported {
    level: number
    ascension: number
    talents: readonly [number, number, number]
    /** HP_CURRENT */
    hp: number
    /** ENERGY_CURRENT */
    energy: number
    /** ENEMY IS SHIELDED */
    shielded: boolean
    enemy: ExportedEnemy
}
/**
 * Exports character data
 */
export function Export(character: Character): Exported {
    return {
        level: character.GetLevel(),
        ascension: character.GetAscension(),
        hp: character.Get(stat.HP_CURRENT),
        energy: character.Get(stat.ENERGY_CURRENT),
        shielded: character.Get(stat.SHIELDED) === 1,
        talents: [
            character.Get(stat.NORMAL_ATTACK_LEVEL),
            character.Get(stat.ELEMENTAL_SKILL_LEVEL),
            character.Get(stat.ELEMENTAL_BURST_LEVEL),
        ],
        enemy: ExportEnemy(character.GetEnemy()),
    }
}
/**
 * Imports character data
 */
export function Import(data: Exported, character: Character): void {
    character.SetLevel(data.level)
    character.SetAscension(data.ascension)
    character.Set(stat.NORMAL_ATTACK_LEVEL, data.talents[0])
    character.Set(stat.ELEMENTAL_SKILL_LEVEL, data.talents[1])
    character.Set(stat.ELEMENTAL_BURST_LEVEL, data.talents[2])
    character.Set(stat.HP_CURRENT, data.hp)
    character.Set(stat.ENERGY_CURRENT, data.energy)
    character.Set(stat.SHIELDED, data.shielded ? 1 : 0)
    ImportEnemy(data.enemy, character.GetEnemy())
}