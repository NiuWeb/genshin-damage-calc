import { Enemy } from "@core/enemy"
import { stat } from "@core/stats"
import { Subject } from "@core/subject"
import { getMaxAscension } from "@src/utils/ascension"
import { GetInfusion, Infusion } from "./infusion"
import { statGet } from "./stat_get"
import { statSet } from "./stat_set"

/**
 * Character attributes
 */
export interface Options {
    /**
     * Character name
     */
    Name: string
    /**
     * Character stats (4 or 5)
     */
    Stars: number
    /**
     * Character element stat
     */
    Element: number
    /**
     * Character weapon stat
     */
    Weapon: number
    /**
     * Elemental burst energy cost
     */
    BurstCost: number

    /** Character region */
    Region: number
}

/**
 * A game character. It contains only the stats,
 * not the instances nor effects
 */
export class Character {
    /**
     * Creates a character with the  given attributes
     */
    constructor(attr: Options) {
        if (attr.Stars !== 4 && attr.Stars !== 5) {
            throw new Error("Character stars must be 4 or 5.")
        }
        this.Options = attr
        this.Subject.Set(stat.LEVEL, 1)
        this.Subject.Set(stat.ASCENSION, 0)
        this.Subject.Set(stat.ENERGY_RECHARGE, 1)
        this.Subject.Set(stat.CRIT_RATE, 0.05)
        this.Subject.Set(stat.CRIT_DMG, 0.5)
        this.Subject.Set(stat.NORMAL_ATTACK_LEVEL, 1)
        this.Subject.Set(stat.ELEMENTAL_SKILL_LEVEL, 1)
        this.Subject.Set(stat.ELEMENTAL_BURST_LEVEL, 1)
        this.Subject.Set(stat.HP_CURRENT, 1)
        this.Subject.Set(stat.ENERGY_CURRENT, 1)

        this.enemy = new Enemy(attr.Name)
    }
    readonly Options: Readonly<Options>
    readonly Subject = new Subject(stat.Length(), "CHARACTER_STATS")
    private enemy: Enemy
    private infusions: Infusion[] = []

    /** Function that maps the final value of character instance's crit rate */
    MapCritRate = (x: number): number => x

    GetEnemy(): Enemy {
        return this.enemy
    }

    /** Is the character shielded */
    IsShielded(): boolean {
        return this.Subject.Get(stat.SHIELDED) === 1 ? true : false
    }

    /** Sets the shield status of the character */
    SetShield(shielded: boolean): Character {
        this.Subject.Set(stat.SHIELDED, shielded === true ? 1 : 0)
        return this
    }

    /**
     * Gets the character level
     */
    GetLevel(): number {
        return this.Subject.Get(stat.LEVEL)
    }
    /**
     * Sets the character level
     */
    SetLevel(level: number): Character {
        return this.Set(stat.LEVEL, level)
    }

    /**
     * Gets the current character ascension
     */
    GetAscension(): number {
        return this.Subject.Get(stat.ASCENSION)
    }

    /**
     * Gets the current character ascension
     */
    SetAscension(ascension: number): Character {
        return this.Set(stat.ASCENSION, ascension)
    }

    /**
     * Checks if the character is ascended
     */
    IsAscended(): boolean {
        return this.GetAscension() === getMaxAscension(this.GetLevel())
    }

    /**
     * Sets a character stat
     */
    Set(stat: number, value: number): Character {
        statSet(this.Subject, stat, value)
        return this
    }

    /** Creates a modifier */
    CreateModifier(stat: number, value: number) {
        return this.Subject.CreateModifier(stat, value)
    }
    /** Creates a observer */
    CreateObserver(stat: number, fn: () => void) {
        return this.Subject.CreateObserver(stat, fn)
    }
    /**
     * Gets a character stat
     */
    Get(stat: number): number {
        return statGet(this.Subject, stat)
    }

    /**
     * Creates and adds a new infusion to character normal attacks
     * @param element Infusion element
     * @param max Whether to add the infusion as non-overridable or not
     * @returns created infusion
     */
    AddInfusion(element: number, max: boolean): Infusion {
        const infusion: Infusion = {
            Enabled: true,
            Element: element,
            Max: max,
            Remove: () => {
                return this.RemoveInfusion(infusion)
            },
        }
        this.infusions.push(infusion)
        return infusion
    }

    /**
     * Removes an infusion from the character
     * @param infusion Infusion to remove
     * @returns Wheter it has been removed or not
     */
    RemoveInfusion(infusion: Infusion): boolean {
        const index = this.infusions.indexOf(infusion)
        if (index === -1) {
            return false
        }
        this.infusions.splice(index, 1)
        return true
    }

    /**
     * Gets the top infusion element
     */
    GetInfusion(): Infusion {
        return GetInfusion(this.infusions)
    }
}