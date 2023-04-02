import { Charbox } from "@core/charbox"
import type { MotionValue, Multiplier } from "@core/instance"
import type { Effect } from "../effect"
import type { Options } from "../type"
import type { Register } from "../register/register"
import { BuilderPart } from "./part"
import { stat } from "@core/stats"
import { InstanceFilter } from "./instance-filter"


export class MvBuilder extends BuilderPart {
    private mvs = new Map<Charbox, MotionValue>()
    private mults = new Map<Charbox, Multiplier>()
    private type: "mv" | "mult" = "mv"
    private stat = stat.NONE
    private value = 0
    private instances: InstanceFilter[] = []

    /** the function to map the stat value */
    private mapFn: ((value: number, ...args: Parameters<Options["OnApply"]>) => number) | undefined

    /** Creates a motion value for the given instances */
    Mv(stat: number, value: number, ...instanceNames: InstanceFilter[]) {
        this.stat = stat
        this.value = value
        this.instances = instanceNames
        this.type = "mv"
        return this
    }
    /** Creates a special multiplier for the given instances */
    Multiplier(value: number, ...instanceNames: InstanceFilter[]) {
        this.value = value
        this.type = "mult"
        this.instances = instanceNames
        return this
    }

    /** Sets the function that will map the effect stat value */
    Map(fn: (value: number, ...args: Parameters<Options["OnApply"]>) => number): MvBuilder {
        this.mapFn = fn
        return this
    }


    onBuild(target: Charbox, _: Effect, register: Register): void {
        const instances = InstanceFilter(target.GetInstances(), this.instances)
        if (this.type === "mv" && this.stat !== stat.NONE && this.value > 0) {
            const mv = register.Mv({ Enabled: false, Stat: this.stat, Value: this.value }, ...instances)
            this.mvs.set(target, mv)
        } else if (this.type === "mult" && this.value > 0) {
            const mult = register.Multiplier({ Enabled: false, Value: this.value }, ...instances)
            this.mults.set(target, mult)
        }
    }
    onEnable(target: Charbox, ef: Effect, reg: Register): void {
        let mv = this.mvs.get(target)
        let mult = this.mults.get(target)
        if (!mv && !mult) {
            this.onBuild(target, ef, reg)
            mv = this.mvs.get(target)
            mult = this.mults.get(target)
        }
        if (mv) {
            if (this.mapFn) {
                mv.Value = this.mapFn(this.value, target, ef, reg)
            } else {
                mv.Value = this.value
            }
        }
        if (mult) {
            if (this.mapFn) {
                mult.Value = this.mapFn(this.value, target, ef, reg)
            } else {
                mult.Value = this.value
            }
        }
    }
    onDisable(target: Charbox): void {
        const mv = this.mvs.get(target)
        const mult = this.mults.get(target)
        if (mv) {
            mv.Value = 0
        }
        if (mult) {
            mult.Value = 1
        }
    }

}