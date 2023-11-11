import type { Infusion } from "@core/character/infusion"
import type { MotionValue, Multiplier } from "@core/instance/base_damage"
import type { Instance } from "@core/instance/instance"
import type { Modifier, Observer } from "@core/subject"
import type { BuilderQuery } from "../builder/query"
import type { InstanceLocation, Charbox } from "@core/charbox"
import { ItemString, PoolItem, QueryPoolItem } from "./pool"

/** Registers objects created in an effect */
export class Register {
    /** registered modifiers */
    private modifiers = new Set<Modifier>()
    /** registered observers */
    private observers = new Set<Observer>()
    /** registered infusions */
    private infusions = new Set<Infusion>()

    /** registered special multipliers */
    private multipliers = new Set<Multiplier>()
    /** instances for the registered special multipliers */
    private mtins = new Set<Instance>()

    /** registered motion values */
    private mvs = new Set<MotionValue>()
    /** instances for the registered motion values */
    private mvins = new Set<Instance>()
    /** registered instances */
    private instances = new Set<[Charbox, InstanceLocation, Instance]>()

    /** Objects waiting to be registered with the next query */
    private queryPool: QueryPoolItem[] = []
    /** Registered objects, grouped by their corresponding query */
    private queryGroups = new Map<BuilderQuery, QueryPoolItem[]>()
    /** query to register objects with */
    private nextQuery: BuilderQuery = {}

    /** gets registered modifiers */
    GetModifiers(): readonly Modifier[] {
        return Array.from(this.modifiers)
    }

    /** Registers a modifier */
    Modifier(modifier: Modifier): Modifier {
        this.modifiers.add(modifier)
        this.queryPool.push({ type: PoolItem.Modifier, object: modifier })
        return modifier
    }
    /** Registers an observer */
    Observer(observer: Observer): Observer {
        this.observers.add(observer)
        // observers are not registered for details
        return observer
    }
    /** Registers an infusion */
    Infusion(infusion: Infusion): Infusion {
        this.infusions.add(infusion)
        this.queryPool.push({ type: PoolItem.Infusion, object: infusion })
        return infusion
    }
    /** Registers a instance special multiplier */
    Multiplier(multiplier: Multiplier, ...instances: Instance[]): Multiplier {
        this.multipliers.add(multiplier)
        instances.forEach(ins => {
            ins.Base.AddMultiplier(multiplier)
            this.mtins.add(ins)
        })
        this.queryPool.push({
            type: PoolItem.Multiplier, object: {
                instances,
                object: multiplier,
            }
        })
        return multiplier
    }
    /** Registers a instance motion alue */
    Mv(mv: MotionValue, ...instances: Instance[]): MotionValue {
        this.mvs.add(mv)
        instances.forEach(ins => {
            ins.Base.AddMv(mv)
            this.mvins.add(ins)
        })
        this.queryPool.push({
            type: PoolItem.MotionValue, object: {
                instances,
                object: mv
            }
        })
        return mv
    }

    /** Registers a damage instance */
    Instance(charbox: Charbox, loc: InstanceLocation, instance: Instance): [Charbox, InstanceLocation, Instance] {
        const pair: [Charbox, InstanceLocation, Instance] = [charbox, loc, instance]
        this.instances.add(pair)
        this.queryPool.push({
            type: PoolItem.Instance,
            object: instance
        })
        return pair
    }

    /**
     * Enables all the registered objects
     */
    Enable(): Register {
        this.observers.forEach(obs => obs.Enable().Notify())
        this.modifiers.forEach(mod => mod.Enable())
        this.infusions.forEach(inf => inf.Enabled = true)
        this.mvs.forEach(mv => mv.Enabled = true)
        this.multipliers.forEach(mt => mt.Enabled = true)
        this.instances.forEach(([box, loc, ins]) => box.AddInstance(loc, ins))
        return this
    }
    /** disables all the registered observers */
    DisableObs(): Register {
        this.observers.forEach(obs => obs.Notify().Disable())
        return this
    }
    /** Disables all the registered objects */
    Disable(): Register {
        this.modifiers.forEach(mod => mod.Disable())
        this.DisableObs()
        this.infusions.forEach(inf => inf.Enabled = false)
        this.mvs.forEach(mv => mv.Enabled = false)
        this.multipliers.forEach(mt => mt.Enabled = false)
        this.instances.forEach(([box, loc, ins]) => box.RemoveInstance(loc, ins))
        return this
    }
    /** Removes all the registered objects */
    Remove(): Register {
        this.Disable()
        this.observers.forEach(obs => obs.Remove())
        this.infusions.forEach(inf => inf.Remove())
        this.mvins.forEach(ins => this.mvs.forEach(mv => ins.Base.RemoveMv(mv)))
        this.mtins.forEach(ins => this.multipliers.forEach(mv => ins.Base.RemoveMultiplier(mv)))
        this.instances.forEach(([box, loc, ins]) => box.RemoveInstance(loc, ins))
        return this
    }

    /** Removes an specific observer */
    RemoveObserver(obs: Observer): Register {
        obs.Remove()
        this.observers.delete(obs)
        return this
    }


    /** 
     * Sets the query to register the next objects with.
     * Grouped objects can be recovered later to display 
     * information about the query that limits their action
     */
    StartQuery(query: BuilderQuery) {
        this.nextQuery = query
    }

    /**
     * Groups all the objects registered after the last
     * `.StartQuery()` call.
     */
    EndQuery(): void {
        this.queryGroups.set(this.nextQuery, [...this.queryPool])
        this.queryPool = []
    }

    /** Describes the registered objects as a string */
    String(): string {
        let result = ""
        for (const [query, items] of this.queryGroups) {
            result += "QUERY: " + JSON.stringify(query) + "\n"
            for (const item of items) {
                result += ItemString(item) + "\n"
            }
            result += "=".repeat(32) + "\n"
        }
        if (this.queryGroups.size === 0) {
            result += "=".repeat(32) + "\n"
        }
        for (const item of this.queryPool) {
            result += ItemString(item) + "\n"
        }
        return result
    }
}