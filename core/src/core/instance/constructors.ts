import { Character } from "@core/character"
import { stat } from "@core/stats"
import { TrToDmg } from "@core/stats/conversions"
import { AddTalentScaling, TalentScaling } from "@core/scaling"
import { Instance } from "./instance"
import { Observer } from "@core/subject"

/**
 * Creates a normal damage instance
 * @param name Instance name
 * @param character instance character
 * @returns created instance
 */
export function Normal(name: string, character: Character): Instance {
    return new Instance(character, {
        Name: name,
        Element: stat.PHYSICAL_DMG,
        Talent: stat.NONE,
        Override: true,
        OverrideElement: stat.NONE,
        Infusion: false,

        Base: true,
        Def: true,
        Res: true,
        Dmg: true,
        Crit: true,
        Quicken: true,
        Amp: true,
        Tr: stat.NONE,
    })
}

/**
 * Creates a transformative damage instance
 */
export function Transformative(reaction: number, element: number | undefined, character: Character): Instance {
    const ins = new Instance(character, {
        Name: "HIT_" + stat.Name(reaction).replace(/_DMG/g, ""),
        Element: stat.PHYSICAL_DMG,
        Talent: stat.NONE,
        Override: false,
        OverrideElement: stat.NONE,
        Infusion: false,

        Base: false,
        Def: false,
        Res: true,
        Dmg: false,
        Crit: true,
        Quicken: false,
        Amp: false,
        Tr: reaction,
    })
    ins.Fix(stat.CRIT_RATE)
    ins.Fix(stat.CRIT_DMG)
    if (reaction === stat.SWIRL_DMG) {
        if (!element) {
            throw new Error("Swirl transformative damage must have an element")
        }
        ins.Options.Quicken = true
        ins.Options.Amp = true
        ins.Options.Name = "HIT_" + (stat.Name(reaction) + "_" + stat.Name(element)).replace(/_DMG/g, "")
        ins.Options.Element = element
    } else {
        ins.Options.Element = TrToDmg(reaction)
    }
    return ins
}

/**
 * Options to create instances with scaling
 */
export interface InstanceOptions {
    /** Instance name */
    Name: string
    /** Instance element stat */
    Element: number
    /** Instance talent stat */
    Talent: number
    /** Instance scaling (MVs) */
    Scaling?: TalentScaling[]
}

/**
 * Creates a damage instance with talent scaling
 */
export function NormalTalent(character: Character, options: InstanceOptions): [instance: Instance, observers: Observer[]] {
    const ins = Normal(options.Name, character)
    const obs: Observer[] = []
    ins.Options.Talent = options.Talent
    ins.Options.Element = options.Element
    if (options.Scaling) {
        for (const scaling of options.Scaling) {
            obs.push(...AddTalentScaling(ins, scaling))
        }
    }
    return [ins, obs]
}