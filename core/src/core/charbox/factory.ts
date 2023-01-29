import { Options as CharacterOptions, Character } from "@core/character"
import { Instance, InstanceOptions, NormalTalent, Transformative } from "@core/instance"
import type { Generator as EffectGenerator } from "@core/effect"
import { stat, weapon } from "@core/stats"
import { Charbox } from "./charbox"
import { TalentScaling } from "@core/scaling"
import { AddCharacterScaling, CharacterScaling } from "@core/scaling/character"

/** Options for damage instances with talent scaling */
export type PartialInstanceOptions = Omit<InstanceOptions, "Scaling"> & {
    Scaling: Omit<TalentScaling, "Talent">[]
}

/** Options for the charbox */
export interface Options extends CharacterOptions, CharacterScaling {
    /** Options for normal attacks */
    Normals: PartialInstanceOptions[]
    /** Options for elemental skills */
    Skills: PartialInstanceOptions[]
    /** Options for elemental bursts */
    Bursts: PartialInstanceOptions[]
    /** Options for extra damage instances */
    Extra: PartialInstanceOptions[]
    /** Effect generators */
    Effects: EffectGenerator[]
}

/** A generator is a function that instanciates the character. It exposes the factory properties */
export interface Generator extends Readonly<Options> {
    (): Charbox
}

/** Creates a charbox generator with the given properties */
export function Factory(options: Options): Generator {
    return Object.assign(function generator() {
        const char = new Character(options)
        AddCharacterScaling(char, options)
        const box = Charbox.create({
            character: char,
            normals: options.Normals.map(opt => NormalTalent(char, talent(opt, stat.NORMAL_ATTACK_LEVEL))[0]),
            skills: options.Skills.map(opt => NormalTalent(char, talent(opt, stat.ELEMENTAL_SKILL_LEVEL))[0]),
            bursts: options.Bursts.map(opt => NormalTalent(char, talent(opt, stat.ELEMENTAL_BURST_LEVEL))[0]),
            tr: transformatives(char),
            extra: options.Extra.map(opt => NormalTalent(char, { ...opt, Scaling: undefined })[0]),
            effects: [],
        })
        box.GetNormals().forEach(ins => ins.Options.Infusion = true)
        options.Effects.forEach(gen => {
            const ef = gen(box)
            ef.Apply(box)
            box.AddEffect(ef)
        })
        return box
    }, options)
}

/** fills the instance options with the given talent scaling */
function talent(opt: PartialInstanceOptions, talent: number): InstanceOptions {
    return {
        ...opt,
        Scaling: opt.Scaling?.map(opt => ({ ...opt, Talent: talent }))
    }
}

/** Creates the transformative reactions corresponding to character element */
function transformatives(character: Character): Instance[] {
    const el = character.Options.Element
    const ins: Instance[] = []
    switch (el) {
        case stat.PYRO_DMG:
            ins.push(Transformative(stat.OVERLOAD_DMG, undefined, character))
            ins.push(Transformative(stat.BURGEON_DMG, undefined, character))
            ins.push(Transformative(stat.BURNING_DMG, undefined, character))
            break
        case stat.HYDRO_DMG:
            ins.push(Transformative(stat.ELECTROCHARGE_DMG, undefined, character))
            ins.push(Transformative(stat.BLOOM_DMG, undefined, character))
            break
        case stat.CRYO_DMG:
            ins.push(Transformative(stat.SUPERCONDUCT_DMG, undefined, character))
            break
        case stat.ELECTRO_DMG:
            ins.push(Transformative(stat.SUPERCONDUCT_DMG, undefined, character))
            ins.push(Transformative(stat.ELECTROCHARGE_DMG, undefined, character))
            ins.push(Transformative(stat.OVERLOAD_DMG, undefined, character))
            ins.push(Transformative(stat.HYPERBLOOM_DMG, undefined, character))
            break
        case stat.DENDRO_DMG:
            ins.push(Transformative(stat.BLOOM_DMG, undefined, character))
            break
        case stat.GEO_DMG:
            ins.push(Transformative(stat.SHATTER_DMG, undefined, character))
            break
        case stat.ANEMO_DMG:
            ins.push(Transformative(stat.SWIRL_DMG, stat.PYRO_DMG, character))
            ins.push(Transformative(stat.SWIRL_DMG, stat.HYDRO_DMG, character))
            ins.push(Transformative(stat.SWIRL_DMG, stat.CRYO_DMG, character))
            ins.push(Transformative(stat.SWIRL_DMG, stat.ELECTRO_DMG, character))
            ins.push(Transformative(stat.SUPERCONDUCT_DMG, undefined, character))
            ins.push(Transformative(stat.ELECTROCHARGE_DMG, undefined, character))
            ins.push(Transformative(stat.OVERLOAD_DMG, undefined, character))
            ins.push(Transformative(stat.HYPERBLOOM_DMG, undefined, character))
            ins.push(Transformative(stat.BLOOM_DMG, undefined, character))
            ins.push(Transformative(stat.BURGEON_DMG, undefined, character))
            break
    }
    if (el !== stat.GEO_DMG && character.Options.Weapon === weapon.CLAYMORE) {
        ins.push(Transformative(stat.SHATTER_DMG, undefined, character))
    }
    return ins
}