import type { Modifier } from "@core/subject"
import type { Effect } from "../effect"
import type { Options } from "../type"
import type { Charbox } from "@core/charbox"
import type { Register } from "../register/register"
import { BuilderPart } from "./part"
import { InstanceFilter } from "./instance-filter"

enum Target {
    CHARACTER,
    ENEMY,
    INSTANCE,
}


export class StatBuilder extends BuilderPart {
    /** find these instances if `.Instance(...)` provided */
    private instances: InstanceFilter[] = []

    private mods = new Map<Charbox, Modifier[]>()
    /** Stat to modify */
    private stat: number[] = []
    /** Target of the modifier (character or enemy) */
    private target = Target.CHARACTER
    /** Whether to use stacks or single values */
    private usestacks = false
    /**
     * An array of values for the stat.
     * Each index of the array contains the values
     * to assign for each rank.
     * 
     * If a subarray has one single value, it will
     * be multiplier for the number of stacks (if usestacks = true).
     * 
     * If a subarray has more than one value, they'll
     * be used one for each stack (if usestacks = true).
     *
     * If usestacks = false, then only the first value in each
     * subarray will be considered.
    */
    private values: number[][] = []

    /** the function to replace effect ranks */
    private rankFn?: (...args: Parameters<Options["OnApply"]>) => number

    /** the function to map the stat value */
    private mapFn?: (value: number, ...args: Parameters<Options["OnApply"]>) => number

    /** function to map stats to modify */
    private mapStatFn?: (...opts: Parameters<Options["OnApply"]>) => number[]

    /** Mapts the stat to modify according to the effect apply inputs */
    MapStat(fn: (...opts: Parameters<Options["OnApply"]>) => number[]): StatBuilder {
        this.mapStatFn = fn
        return this
    }

    /** Sets the stat to modify to the TARGET CHARACTER */
    Char(...stats: number[]): StatBuilder {
        this.stat = stats
        this.target = Target.CHARACTER
        return this
    }
    /** Sets the stat to modify to the TARGET ENEMY */
    Enemy(...stats: number[]): StatBuilder {
        this.stat = stats
        this.target = Target.ENEMY
        return this
    }

    /** create the modifier for the given instances instead of the character */
    Instance(...instances: InstanceFilter[]): StatBuilder {
        this.instances = instances
        this.target = Target.INSTANCE
        return this
    }

    /** Sets the single values of the stat, each argument corresponding to one rank */
    Values(...values: number[]): StatBuilder {
        this.usestacks = false
        this.values = values.map(v => [v])
        return this
    }
    /**
     * Sets the values of the stat. Each argument corresponds to one rank.
     * 
     * An argument is an array of numbers: if the array has only one value,
     * then that value will be multiplied by the number of stacks. Otherwise,
     * it will select the value in the position corresponding to the number
     * of stacks.
     * 
     * If no arguments provided, the method won't change the stat values
     * set by `.Values()` but will enable the use of stacks.
     */
    Stacks(...stacks: number[][]): StatBuilder {
        this.usestacks = true
        if (stacks.length > 0) {
            this.values = stacks
        }
        return this
    }
    /** Sets the function that will replace the effect rank value */
    Rank(fn: (...args: Parameters<Options["OnApply"]>) => number): StatBuilder {
        this.rankFn = fn
        return this
    }
    /** Sets the function that will map the effect stat value */
    Map(fn: (value: number, ...args: Parameters<Options["OnApply"]>) => number): StatBuilder {
        this.mapFn = fn
        return this
    }

    onBuild(target: Charbox, ef: Effect, reg: Register): void {
        const mods: Modifier[] = []
        if (this.mapStatFn) {
            this.stat = this.mapStatFn(target, ef, reg)
        }

        const instances = this.target === Target.INSTANCE ?
            InstanceFilter(target.GetInstances(), this.instances) :
            []

        switch (this.target) {
            case Target.CHARACTER:
                for (const stat of this.stat) {
                    mods.push(reg.Modifier(target.GetCharacter().CreateModifier(stat, 0)))
                }
                break
            case Target.ENEMY:
                for (const stat of this.stat) {
                    mods.push(reg.Modifier(target.GetCharacter().GetEnemy().Subject.CreateModifier(stat, 0)))
                }
                break
            case Target.INSTANCE:
                for (const stat of this.stat) {
                    for (const ins of instances) {
                        mods.push(reg.Modifier(ins.Subject.CreateModifier(stat, 0)))
                    }
                }
                break
            default:
                throw new Error("Cannot create the modifier. Unknown target " + String(this.target).valueOf())
        }
        this.mods.set(target, mods)
    }
    onEnable(target: Charbox, ef: Effect, reg: Register): void {
        const mods = this.mods.get(target)
        if (!mods) return

        if (this.values.length === 0) {
            mods.forEach(mod => mod.SetValue(0))
            return
        }
        let rank: number
        if (this.rankFn) {
            rank = this.rankFn(target, ef, reg)
            if(rank < 1) rank = 1
        } else {
            rank = ef.GetRank()
        }
        if (rank > this.values.length) {
            rank = this.values.length
        }
        const values = this.values[rank - 1]
        let value = getValue(this.usestacks, values, ef.GetStacks())
        if (this.mapFn) {
            value = this.mapFn(value, target, ef, reg)
        }
        for (const mod of mods) {
            if (mod.GetValue() !== value) {
                mod.SetValue(value)
            }
        }
    }
    onDisable(target: Charbox): void {
        const mod = this.mods.get(target)
        if (!mod) return
        mod.forEach(mod => mod.SetValue(0))
    }
}

/**
 * Gets the final value according to the given
 * values and usestacks property of the builder
 */
function getValue(usestacks: boolean, values: number[], stacks: number): number {
    if (usestacks) {
        const l = values.length
        // if only one value: multipliy it by the stacks
        if (l === 1) {
            return values[0] * stacks
        }
        // if nore than one value: select the value in the corresponding position
        else if (l > 1) {
            if (stacks > l - 1) {
                stacks = l - 1
            }
            return values[stacks]
        } else {
            return 0
        }
    } else {
        return values[0]
    }
}