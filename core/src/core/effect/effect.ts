import type { Charbox } from "@core/charbox/charbox"
import type { Options } from "./type"
import { Observer, Subject } from "@core/subject"
import { Register } from "./register/register"
import { EffectEvent } from "./events"
import { Horizontal } from "@src/strings/horizontal"
import { Logger } from "@src/cmd2"
import { AuraToDmg } from "../stats"

/**
 * An effect groups modifiers, observers and other objects
 * in a single controlled entity
 */
export class Effect {
    constructor(readonly Options: Readonly<Required<Options>>, readonly Owner: Charbox) { }

    private targets = new Set<Charbox>()
    private register = new Map<Charbox, Register>()
    private onUnapply = new Map<Charbox, () => void>()
    private enabled = false

    private rank = 1
    private stacks = 0
    private conditions = new Set<string>()
    private auras = new Set<number>()

    readonly Event = new Subject(EffectEvent.Length(), "EFFECT_EVENT")

    /** Creates an observer for effect events */
    CreateObserver(event: number, fn: () => void): Observer {
        return this.Event.CreateObserver(event, fn)
    }

    /** Checks if the effect is enabled */
    Enabled(): boolean {
        return this.enabled
    }
    /**
     * Enables the effect
     */
    Enable(): Effect {
        this.enabled = true
        for (const [, v] of this.register) {
            v.Enable()
        }
        this.Event.Notify(EffectEvent.ENABLE)
        return this
    }
    /**
     * Disables the effect
     */
    Disable(): Effect {
        this.enabled = false
        for (const [, v] of this.register) {
            v.Disable()
        }
        this.Event.Notify(EffectEvent.DISABLE)
        return this
    }

    /** Gets all the applied targets */
    GetTargets(): readonly Charbox[] {
        return Array.from(this.targets.values())
    }

    /** 
     * Disables all observers for a given target character. 
     * This is useful to lock the effect stats and prevent modifications.
     * @param target Character to disable observers for
     */
    Lock(target: Charbox): Effect {
        const reg = this.register.get(target)
        if (!reg) {
            Logger.Global.Warnf(
                "Cannot lock effect %s for target %s because its not applied.",
                this.Options.Name,
                target.GetCharacter().Options.Name
            )
            return this
        }
        reg.DisableObs()
        return this
    }

    /** 
     * Applies the effect to multiple targets
     * @returns the number of targets that were applied to
     */
    ApplyMultiple(targets: readonly Charbox[]): number {
        const set = new Set(targets)
        if (!this.Options.ApplyOther) {
            const hasSelf = set.has(this.Owner)
            const length = set.size
            set.clear()
            if (hasSelf) {
                set.add(this.Owner)
                if (length > 1) {
                    Logger.Global.Warnf(
                        "Effect \"%s\" can only be applied to its owner: \"%s\"",
                        this.Options.Name,
                        this.Owner.GetCharacter().Options.Name
                    )
                }
            }
        }
        if (!this.Options.ApplySelf) {
            set.delete(this.Owner)
            Logger.Global.Warnf(
                "Effect \"%s\" CANNOT be applied to its owner: \"%s\"",
                this.Options.Name,
                this.Owner.GetCharacter().Options.Name,
            )
        }
        if (this.Options.MaxTargets > 0) {
            let deletions = 0
            for (let i = 0; i < targets.length && set.size > this.Options.MaxTargets; i++) {
                set.delete(targets[i])
                deletions++
            }
            if (deletions > 0) {
                Logger.Global.Warnf(
                    "Effect \"%s\" maximum targets is %d.",
                    this.Options.Name,
                    this.Options.MaxTargets
                )
            }
        }
        this.UnapplyAll()
        let applied = 0
        for (const tg of set) {
            if (this.Apply(tg)) {
                applied++
            }
        }
        return applied
    }

    /** Applies the effect to the given target. 
     * @returns false if effect was not applied, due to the target
     * already been applied, or because of options constraints.
     */
    Apply(target: Charbox): boolean {
        if (!this.Options.StackSelf) {
            const party = target.GetParty()
            if (party) {
                const applied = party
                    .GetAppliedEffects(target)
                    .find(e => e.Options.Name === this.Options.Name)

                if (applied) {
                    Logger.Global.Warnf(
                        "Cannot apply effect \"%s\" to target \"%s\". Another instance of this effect is already applied to the target",
                        this.Options.Name,
                        target.GetCharacter().Options.Name,
                    )
                    return false
                }
            }
        }


        if (!this.Options.ApplySelf && target === this.Owner) {
            Logger.Global.Warnf(
                "Cannot apply effect \"%s\" to target \"%s\". Effect CANNOT be applied to its owner: \"%s\"",
                this.Options.Name,
                target.GetCharacter().Options.Name,
                this.Owner.GetCharacter().Options.Name,
            )
            return false
        }
        if (!this.Options.ApplyOther && target !== this.Owner) {
            Logger.Global.Warnf(
                "Cannot apply effect \"%s\" to target \"%s\". Effect can only be applied to its owner: \"%s\"",
                this.Options.Name,
                target.GetCharacter().Options.Name,
                this.Owner.GetCharacter().Options.Name,
            )
            return false
        }
        if (this.Options.MaxTargets > 0 && this.targets.size >= this.Options.MaxTargets) {
            Logger.Global.Warnf(
                "Cannot apply effect \"%s\" to target \"%s\". Effect is applied to its maximum number of targets: %d",
                this.Options.Name,
                target.GetCharacter().Options.Name,
                this.Options.MaxTargets
            )
            return false
        }
        if (this.targets.has(target)) {
            Logger.Global.Warnf(
                "Cannot apply effect \"%s\" to target \"%s\". Effect is applied to this target",
                this.Options.Name,
                target.GetCharacter().Options.Name,
            )
            return false
        }
        // save target and its new register
        this.targets.add(target)
        const register = new Register()
        this.register.set(target, register)

        // run apply function and save returned unapply function
        const onUnapply = this.Options.OnApply(target, this, register)
        this.onUnapply.set(target, onUnapply)

        if (!this.Enabled()) {
            register.Disable()
        } else {
            register.Enable()
        }
        this.Event.Notify(EffectEvent.CHANGE_TARGET)
        return true
    }
    /**
     * Unapplies the effect from the character. 
     * @returns true if the character was found and unapplied.
     */
    Unapply(target: Charbox): boolean {
        if (!this.targets.has(target)) {
            return false
        }
        this.targets.delete(target)
        this.register.get(target)?.Remove()
        this.register.delete(target)
        this.onUnapply.get(target)?.()
        this.onUnapply.delete(target)
        this.Event.Notify(EffectEvent.CHANGE_TARGET)
        return true
    }

    /** Unapplies the effect from all targets */
    UnapplyAll(): Effect {
        this.targets.forEach(target => this.Unapply(target))
        return this
    }

    /** Gets the effect rank */
    GetRank(): number {
        return this.rank
    }
    /** Gets the effect stacks */
    GetStacks(): number {
        return this.stacks
    }

    /** Sets the effect rank */
    SetRank(rank: number): Effect {
        rank = Math.floor(rank)
        if (rank > this.Options.MaxRank) {
            rank = this.Options.MaxRank
        }
        if (rank < 1) {
            rank = 1
        }
        this.rank = rank
        this.Event.Notify(EffectEvent.CHANGE_RANK)
        return this
    }

    /** Sets the effect stacks */
    SetStacks(stacks: number): Effect {
        if (stacks > this.Options.MaxStacks) {
            stacks = this.Options.MaxStacks
        }
        if (stacks < 0) {
            stacks = 0
        }
        this.stacks = stacks
        this.Event.Notify(EffectEvent.CHANGE_STACKS)
        return this
    }

    /** Checks if a condition is applied to the effect */
    HasCondition(cond: string): boolean {
        return this.conditions.has(cond.toUpperCase())
    }

    /** 
     * Sets the conditions applied to the effect, 
     * only if they're included in the configuration.
     */
    SetConditions(...conds: string[]): Effect {
        this.conditions.clear()
        for (let cond of conds) {
            cond = cond.toUpperCase()
            if (this.Options.Conditions.includes(cond) && this.conditions.size < this.Options.MaxConditions) {
                this.conditions.add(cond)
            }
        }
        this.Event.Notify(EffectEvent.CHANGE_CONDITIONS)
        return this
    }
    /** Gets the list of conditions applied */
    GetConditions(): readonly string[] {
        return Array.from(this.conditions)
    }

    /** Checks if an aura is applied to the effect */
    HasAura(aura: number): boolean {
        return this.auras.has(aura)
    }
    /** Sets the auras applied to the effect */
    SetAuras(...auras: number[]): Effect {
        const valid = this.Options.ValidAuras
        this.auras.clear()
        for (const aura of auras) {
            if (
                (this.auras.size < this.Options.MaxAuras) &&
                (valid.length === 0 || (valid.length > 0 && valid.includes(aura)))
            ) {
                this.auras.add(aura)
            }
        }
        this.Event.Notify(EffectEvent.CHANGE_AURAS)
        return this
    }
    /** Gets the list of applied auras */
    GetAuras(): readonly number[] {
        return Array.from(this.auras)
    }
    /**
     * Checks if the effect is affected by a given element
     */
    Affected(element: number): boolean {
        for (const aura of this.auras) {
            const el = AuraToDmg(aura)
            if (el === element) {
                return true
            }
        }
        return false
    }

    /** Describes the registered objects of a target in the effect */
    TargetRegister(target: Charbox): string | undefined {
        const reg = this.register.get(target)
        if (!reg) { return undefined }
        return reg.String()
    }

    /** Prints the register of all characters */
    Register(): string {
        const regs = this.GetTargets().map(tg => (
            tg.GetCharacter().Options.Name + "\n" + this.TargetRegister(tg) || ""
        ))
        const res: string[] = []
        for (let i = 0; i < regs.length; i++) {
            res[2 * i] = regs[i]
            res[2 * i + 1] = " ".repeat(4)
        }
        return Horizontal(...res)
    }
}