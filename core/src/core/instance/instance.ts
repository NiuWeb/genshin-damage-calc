import { Character } from "@core/character"
import { TotalStat } from "@core/formula"
import { CritType, DamageOptions, DamageStats } from "@core/formula/options"
import { stat } from "@core/stats"
import { DmgToAtkFlat, DmgToAtkPercent, DmgToCritDmg, DmgToCritRate, DmgToFlatDmg } from "@core/stats/conversions"
import { Subject } from "@core/subject"
import { BaseDamage } from "./base_damage"
import { calculate, damageParams } from "./instance_calc"

const stats = stat
/**
 * Damage instance attributes
 */
export interface Options {
    /** damage instance name */
    Name: string
    /** instance element */
    Element: number
    /** instance talent */
    Talent: number

    /** Can the element be overrided? */
    Override: boolean
    /** Element to override with */
    OverrideElement: number
    /** load override element from character infusion? */
    Infusion: boolean

    /** include Base damage */
    Base: boolean
    /** include Def multiplier */
    Def: boolean
    /** include Res multiplier */
    Res: boolean
    /** include non-transformative damage bonus */
    Dmg: boolean
    /** Allow triggering crits */
    Crit: boolean
    /** Allow triggering quicken */
    Quicken: boolean
    /** Allow triggering vape/melt */
    Amp: boolean
    /* transformative reaction type */
    Tr: number
}
/**
 * A damage instance
 */
export class Instance {
    /**
     * Creates a damage instance with the given attributes
     */
    constructor(readonly Character: Character, public readonly Options: Options) {
        this.Subject = new Subject(stat.Length(), "INSTANCE_" + this.Options.Name)
    }
    /**
     * Instance base damage
     */
    readonly Base = new BaseDamage(this)
    /**
     * Custom instance properties
     */
    readonly Subject: Subject
    /**
     * Mark stats as fixed. Fixed stats won't be added
     * with the character stat' value, only with the instance's
     */
    private readonly fixed = new Uint8Array(stat.Length())

    /**
     * Gets the final element of the damage instance
     */
    GetElement(): number {
        if (this.Options.Override) {
            if (this.Options.OverrideElement !== stat.NONE) {
                return this.Options.OverrideElement
            } else if (this.Options.Infusion) {
                const inf = this.Character.GetInfusion()
                if (inf) {
                    return inf.Element
                }
            }
        }
        return this.Options.Element
    }

    /**
     * Fixs an stat to use only the instance's value, not the character's.
     */
    Fix(stat: number): Instance {
        this.fixed[stat] = 1
        return this
    }
    /**
     * Unfixs an stat to use the instance's value + the character's.
     */
    Unfix(stat: number): Instance {
        this.fixed[stat] = 0
        return this
    }

    /**
     * Gets the instance computed stat
     */
    Get(stat: number): number {
        if (stat === stats.ATK) {
            const element = this.GetElement()
            const elPercent = DmgToAtkPercent(element)
            const elFlat = DmgToAtkFlat(element)

            const talent = this.Options.Talent
            const tlPercent = DmgToAtkPercent(talent)
            const tlFlat = DmgToAtkFlat(talent)

            const atkBase = this.Get(stats.ATK_BASE)
            let atkPercent = this.Get(stats.ATK_PERCENT)
            let atkFlat = this.Get(stats.ATK_FLAT)

            if (elPercent !== stats.NONE) {
                atkPercent += this.Get(elPercent)
            }
            if (tlPercent !== stats.NONE) {
                atkPercent += this.Get(tlPercent)
            }
            if (elFlat !== stats.NONE) {
                atkFlat += this.Get(elFlat)
            }
            if (tlFlat !== stats.NONE) {
                atkFlat += this.Get(tlFlat)
            }
            return TotalStat(atkBase, atkPercent, atkFlat)
        } else if (stat === stats.CRIT_RATE) {
            const element = this.GetElement()
            const talent = this.Options.Talent

            const elCr = DmgToCritRate(element)
            const tlCr = DmgToCritRate(talent)

            let cr = 0.0

            cr += this.Subject.Get(stats.CRIT_RATE)
            cr += this.Subject.Get(stats.EXTRA_CRIT_RATE)

            if (!this.fixed[stats.CRIT_RATE]) {
                cr += this.Character.Get(stats.CRIT_RATE)
            }

            if (!this.fixed[stats.EXTRA_CRIT_RATE]) {
                cr += this.Character.Get(stats.EXTRA_CRIT_RATE)
            }

            cr += this.Get(elCr) + this.Get(tlCr)
            return this.Character.MapCritRate(cr)
        } else if (stat === stats.CRIT_DMG) {
            const element = this.GetElement()
            const talent = this.Options.Talent

            const elCd = DmgToCritDmg(element)
            const tlCd = DmgToCritDmg(talent)

            let cd = this.Subject.Get(stats.CRIT_DMG)
            if (!this.fixed[stats.CRIT_DMG]) {
                cd += this.Character.Get(stats.CRIT_DMG)
            }
            cd += this.Get(elCd) + this.Get(tlCd)
            return cd
        } else if (stat === stats.DMG_FLAT) {
            const element = this.GetElement()
            const talent = this.Options.Talent

            const elFlat = DmgToFlatDmg(element)
            const tlFlat = DmgToFlatDmg(talent)

            let flat = this.Subject.Get(stats.DMG_FLAT)
            if (!this.fixed[stats.DMG_FLAT]) {
                flat += this.Character.Get(stats.DMG_FLAT)
            }
            flat += this.Get(elFlat) + this.Get(tlFlat)
            return flat
        } else {
            if (this.fixed[stat]) {
                return this.Subject.Get(stat)
            }
            return this.Character.Get(stat) + this.Subject.Get(stat)
        }
    }

    /** Calculates the Non-crit damage */
    DmgNoCrit(reaction: boolean): number {
        return calculate(this, reaction, CritType.NO_CRIT)
    }

    /** Calculates the crit damage */
    DmgCrit(reaction: boolean): number {
        return calculate(this, reaction, CritType.CRIT)
    }

    /** Calculates the average-crit damage */
    DmgAvg(reaction: boolean): number {
        return calculate(this, reaction, CritType.CRIT_AVG)
    }
    /** Gets the params (stats and options) of damage calculation for this instance */
    Params(reaction: boolean, crit: CritType): { stats: DamageStats, options: DamageOptions } {
        return damageParams(this, reaction, crit)
    }
}