
/** A motion value is a percentage of a given stat */
export interface MotionValue {
    Enabled: boolean
    Stat: number
    Value: number
}

/** A special multiplier is applied after the sum of all MVs */
export interface Multiplier {
    Enabled: boolean
    Value: number
}
/** Base damage control */
export class BaseDamage {
    /**
     * Creates a base damage control
     */
    constructor(private instance: { Get(stat: number): number }) { }

    private readonly motions: MotionValue[] = []
    private readonly multipliers: Multiplier[] = []

    /**
     * Creates a new Motion Value for the base damage.
     * @param stat the stat of the MV.
     * @param value The value of the MV.
    */
    CreateMv(stat: number, value: number): MotionValue {
        const mv: MotionValue = {
            Enabled: true,
            Stat: stat,
            Value: value,
        }
        this.motions.push(mv)
        return mv
    }

    /**
     * Adds an already created mv to the base damage.
     * @returns whether the mv has been added or not
     */
    AddMv(mv: MotionValue): boolean {
        if (this.motions.includes(mv)) {
            return false
        }
        this.motions.push(mv)
        return true
    }
    /**
     * removes a mv from the base damage
     * @param mv Mv to remove
     * @returns Whether the mv has been removed or not
     */
    RemoveMv(mv: MotionValue): boolean {
        const index = this.motions.indexOf(mv)
        if (index === -1) {
            return false
        }
        this.motions.splice(index, 1)
        return true
    }

    /**
     * Gets the list of all mvs
     */
    GetMvs(): readonly MotionValue[] {
        return this.motions
    }

    /**
     * Creates a new multiplier for the base damage.
     * @param value The value of the multiplier.
    */
    CreateMultiplier(value: number): Multiplier {
        const mv: Multiplier = {
            Enabled: true,
            Value: value,
        }
        this.multipliers.push(mv)
        return mv
    }

    /**
     * Adds an already created multiplier to the base damage.
     * @returns whether the multiplier has been added or not
     */
    AddMultiplier(mv: Multiplier): boolean {
        if (this.multipliers.includes(mv)) {
            return false
        }
        this.multipliers.push(mv)
        return true
    }
    /**
     * removes a multiplier from the base damage
     * @param mv multiplier to remove
     * @returns Whether the multiplier has been removed or not
     */
    RemoveMultiplier(mv: Multiplier): boolean {
        const index = this.multipliers.indexOf(mv)
        if (index === -1) {
            return false
        }
        this.multipliers.splice(index, 1)
        return true
    }

    /**
     * Gets the list of all multipliers
     */
    GetMultipliers(): readonly Multiplier[] {
        return this.multipliers
    }

    /**
     * Computes the base damage
     */
    Compute(): number {
        let r = 0
        for (const v of this.motions) {
            if (v.Enabled) {
                r += this.instance.Get(v.Stat) * v.Value
            }
        }
        for (const v of this.multipliers) {
            if (v.Enabled) {
                r *= v.Value
            }
        }
        return r
    }
}