import type { Character } from "@core/character"
import type { Effect } from "../effect"
import { stat } from "@core/stats"
import { Charbox } from "@src/core/charbox"

/** numeric relations */
interface RelationQuery {
    /** Greater than */
    g?: number
    /** Greater or equal than */
    geq?: number
    /** less than */
    l?: number
    /** Less or equal than */
    leq?: number
}
/**
 * Query for a character
 */
interface CharacterQuery {
    /** character name matches the given string */
    name?: string | RegExp
    /** character should have at least this ascensionT */
    ascension?: number
    /** character should have the at least one of these weapons */
    weapon?: number[]
    /** Current hp must match the condition */
    hp?: RelationQuery,
    /** Current energy must match the condition */
    energy?: RelationQuery
    /** Character must be shielded */
    shielded?: boolean
    /** is this character the effect owner? */
    isOwner?: boolean
}
/** Query for entities with an aura (enemy and effect) */
interface AuraQuery {
    /** object should be affected by at least one of these elements */
    affected?: number[]
    /** object should have at least one of these auras */
    aura?: number[]
}
/**
 * Object with the minimum methods to check auras
 */
interface AuraEntity {
    HasAura(aura: number): boolean
    Affected(element: number): boolean
}

/** query object to limit effects application */
interface builderQuery {
    /** Negate the query */
    not?: boolean
    /** Query for the target character */
    target?: CharacterQuery
    /** Query for the owner character */
    owner?: CharacterQuery
    /** Query for the target enemy */
    enemy?: AuraQuery
    /** Query for the effect */
    effect?: AuraQuery & {
        /** effect should have at least one of these conditions */
        conditions?: string[]
    }
}
/** custom query function  */
type builderQueryFn = (target: Charbox, owner: Charbox, ef: Effect) => boolean

/** query object to limit effects application */
export type BuilderQuery = builderQuery | builderQueryFn

/** Runs a relation query */
function runRelationQuery(value: number, q: RelationQuery): boolean {
    if (Number.isFinite(q.g) && !(value > (q.g || 0))) {
        return false
    }
    if (Number.isFinite(q.geq) && !(value >= (q.geq || 0))) {
        return false
    }
    if (Number.isFinite(q.l) && !(value < (q.l || 0))) {
        return false
    }
    if (Number.isFinite(q.leq) && !(value <= (q.leq || 0))) {
        return false
    }
    return true
}

/** Runs a query for a character */
function runCharacterQuery(character: Character, owner: Character, q: CharacterQuery): boolean {
    if (q.name) {
        if (typeof q.name === "string") {
            if (character.Options.Name.toLowerCase() !== q.name.toLowerCase()) {
                return false
            }
        } else {
            if (!character.Options.Name.match(q.name)) {
                return false
            }
        }
    }
    if (character.GetAscension() < (q.ascension || 0)) {
        return false
    }
    if (q.weapon && q.weapon.length > 0) {
        const some = q.weapon.some(wp => character.Options.Weapon === wp)
        if (!some) {
            return false
        }
    }
    const hp = character.Get(stat.HP_CURRENT)
    const energy = character.Get(stat.ENERGY_CURRENT)

    if (q.hp && !runRelationQuery(hp, q.hp)) {
        return false
    }
    if (q.energy && !runRelationQuery(energy, q.energy)) {
        return false
    }

    if (q.shielded !== undefined) {
        if (character.IsShielded() !== q.shielded) {
            return false
        }
    }

    if (q.isOwner !== undefined) {
        const isOwner = character === owner
        if (isOwner !== q.isOwner) {
            return false
        }
    }

    return true
}
/** Runs a query for an aura object */
function runAuraQuery(object: AuraEntity, q: AuraQuery): boolean {
    if (q.affected && q.affected.length > 0 && object.Affected) {
        const some = q.affected.some(el => object.Affected?.(el))
        if (!some) {
            return false
        }
    }
    if (q.aura && q.aura.length > 0) {
        const some = q.aura.some(el => object.HasAura(el))
        if (!some) {
            return false
        }
    }
    return true
}

function runQuery(q: builderQuery, owner: Character, target: Character, ef: Effect): boolean {
    if (q.target) {
        if (!runCharacterQuery(target, owner, q.target)) {
            return false
        }
    }
    if (q.owner) {
        if (!runCharacterQuery(owner, owner, q.owner)) {
            return false
        }
    }
    if (q.enemy) {
        if (!runAuraQuery(target.GetEnemy(), q.enemy)) {
            return false
        }
    }
    if (q.effect) {
        if (!runAuraQuery(ef, q.effect)) {
            return false
        }
        if (q.effect.conditions && q.effect.conditions.length > 0) {
            const some = q.effect.conditions.some(cond => ef.HasCondition(cond))
            if (!some) {
                return false
            }
        }
    }
    return true
}

/**
 * Evaluates a query and returns its boolean result
 */
export function RunQuery(q: BuilderQuery, owner: Charbox, target: Charbox, ef: Effect): boolean {
    if (typeof q === "function") {
        return q(target, owner, ef)
    } else {
        let query = runQuery(q, owner.GetCharacter(), target.GetCharacter(), ef)
        if (q.not) { query = !query }
        return query
    }
}