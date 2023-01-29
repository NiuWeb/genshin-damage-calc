import type { Charbox } from "@core/charbox"
import type { Effect } from "@core/effect"
import type { Options } from "./factory"
import { GetWeaponAtkBase, GetWeaponSubstat } from "@core/scaling"
import { Modifier } from "@core/subject"
import { stat } from "@core/stats"
import { getMaxAscension, getMinAscension } from "@src/utils/ascension"
import { MapList } from "@src/utils/lists/list"

/** A weapon with stats and effects that can be attached to a character. */
export class Weapon {
    constructor(readonly Options: Options, effects: Effect[]) {
        this.effects.AddList(effects)
    }
    private effects = new MapList<Effect>(ef => ef.Options.Name)
    private target: Charbox | undefined

    private level = 1
    private ascension = 0
    private rank = 1

    private atkMod: Modifier | undefined
    private subMod: Modifier | undefined

    /** Equips the weapon to the given character */
    Equip(target: Charbox): Weapon {
        if (this.target) {
            this.Unequip()
        }
        this.target = target
        this.effects.Get().forEach(ef => ef.Enable().Apply(target))

        this.atkMod = target.GetCharacter().CreateModifier(stat.ATK_BASE, 0)
        this.subMod = target.GetCharacter().CreateModifier(this.Options.Substat, 0)

        this.setMods()
        return this
    }

    /** Unequips the weapon, effects and stats from the target */
    Unequip(): Weapon {
        this.effects.Get().forEach(ef => ef.Disable().UnapplyAll())
        this.atkMod?.Disable()
        this.subMod?.Disable()
        this.atkMod = undefined
        this.subMod = undefined
        this.target = undefined
        return this
    }

    /** Gets the weapon level */
    GetLevel(): number {
        return this.level
    }

    /** Gets the weapon ascension */
    GetAscension(): number {
        return this.ascension
    }

    /** Checks if the weapon is ascended or not */
    IsAscended(): boolean {
        return this.GetAscension() === getMaxAscension(this.level)
    }

    /** Gets the weapon rank */
    GetRank(): number {
        return this.rank
    }

    /** Gets the weapon substat */
    GetSubstat(): number {
        return this.Options.Substat
    }

    /** Gets the weapon atk base */
    GetAtkBase(): number {
        return GetWeaponAtkBase(this.Options.Stars, this.Options.Scaling, this.level, this.ascension)
    }

    /** Gets the weapon substat value */
    GetSubstatValue(): number {
        return GetWeaponSubstat(this.Options.Scaling, this.level, this.Options.Substat)
    }

    /** Gets the list of effects */
    GetEffects(): readonly Effect[] {
        return this.effects.Get()
    }
    /** Find an effect by its name */
    FindEffect(name: string): Effect | undefined {
        return this.effects.Find(name)
    }

    /** Sets the weapon level */
    SetLevel(level: number): Weapon {
        level = Math.max(1, Math.min(90, Math.floor(level)))
        const min = getMinAscension(level)
        const max = getMaxAscension(level)
        let asc = this.ascension
        if (asc < min) {
            asc = min
        } else if (asc > max) {
            asc = max
        }
        this.ascension = asc
        this.level = level
        this.setMods()
        return this
    }

    /** Sets the weapon ascension */
    SetAscension(ascension: number): Weapon {
        const min = getMinAscension(this.level)
        const max = getMaxAscension(this.level)
        let asc = ascension
        if (asc < min) {
            asc = min
        } else if (asc > max) {
            asc = max
        }
        this.ascension = Math.floor(asc)
        this.setMods()
        return this
    }

    /** Sets the weapon rank and its effects' rank */
    SetRank(rank: number): Weapon {
        rank = Math.max(1, Math.min(5, Math.floor(rank)))
        this.rank = rank
        this.effects.Get().forEach(ef => ef.SetRank(rank))
        return this
    }


    /** Sets the modifier values */
    private setMods(): void {
        const atkBase = this.GetAtkBase()
        const substat = this.GetSubstatValue()
        this.atkMod?.SetValue(atkBase)
        this.subMod?.SetValue(substat)
    }
}