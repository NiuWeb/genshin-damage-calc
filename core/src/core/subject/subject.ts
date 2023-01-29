import { Modifier, Observer } from "./type"

/**
 * A subject has observable and modificable properties
 */
export class Subject {
    private readonly props: Float64Array
    private readonly observers: Observer[][]
    /**
     * Creates a new subject with observable and modificable properties
     * @param length Number of properties (cannot be changed)
     * @param Title A string description of the subject constructor
     */
    constructor(length: number, public readonly Title: string) {
        this.props = new Float64Array(length)
        this.observers = Array.from(Array(length)).fill(0).map(() => [])
    }
    /**
     * Gets the number of properties of the subject
     */
    Length(): number {
        return this.props.length
    }
    /**
     * Gets the value of a property.
     * @param prop Property index
     * @returns Property value
     */
    Get(prop: number): number {
        const val = this.props[prop]
        if (val === undefined) {
            throw new Error(`Subject property out of bounds: ${prop}`)
        }
        return val
    }
    /**
     * Sets the value of a property
     * @param prop Property index
     * @param value Property value
     * @param reason object to pass as notification reason
     * @returns the same subject
     */
    Set(prop: number, value: number, reason?: unknown): Subject {
        this.props[prop] = value
        return this.Notify(prop, reason)
    }
    /**
     * Notifies all the observers enabled and subscribed to an
     * specific property.
     * @param prop The property to notify
     * @param reason The object to pass as notification reason
    */
    Notify(prop: number, reason?: unknown): Subject {
        for (const obs of this.observers[prop]) {
            if (obs.Enabled()) {
                obs.Notify(reason)
            }
        }
        return this
    }
    /**
     * Creates a new observer to the subject. An observer triggers a function
     * when any property is updated, or a notification is forced.
     * @param prop the property index to add the observer to.
     * @param fn the function to trigger.
     * @returns the created observer.
     */
    CreateObserver(prop: number, fn: (reason?: unknown) => void): Observer {
        let enabled = true
        const observer: Observer = {
            prop,
            Enabled() {
                return enabled
            },
            Enable() {
                enabled = true
                return observer
            },
            Disable() {
                enabled = false
                return observer
            },
            Remove: () => this.RemoveObserver(observer),
            Notify(reason?: unknown) {
                fn(reason)
                return observer
            },
        }
        this.observers[prop].push(observer)
        return observer
    }

    /**
     * Removes a previously created observer from the subject.
     * @param obs Observer to remove
     * @returns true if the observer has been found and removed,
     * false otherwise.
     */
    RemoveObserver(obs: Observer): boolean {
        const index = this.observers[obs.prop].indexOf(obs)
        if (index === -1) {
            return false
        }
        this.observers[obs.prop].splice(index, 1)
        return true
    }
    /**
     * Creates a new modifier for the given property.
     * Modifier is created as Enabled by default.
     * @param prop The property to modify.
     * @param value The modification value.
     * @returns the created modifier.
    */
    CreateModifier(prop: number, value: number): Modifier {
        let enabled = false
        const mod: Modifier = {
            Title: this.Title,
            Enabled() {
                return enabled
            },
            Enable: () => {
                if (enabled) {
                    return mod
                }
                this.Set(prop, this.Get(prop) + value, mod)
                enabled = true
                return mod
            },
            Disable: () => {
                if (!enabled) {
                    return mod
                }
                this.Set(prop, this.Get(prop) - value, mod)
                enabled = false
                return mod
            },
            GetProp() {
                return prop
            },
            GetValue() {
                return value
            },
            SetProp(newprop) {
                const was = enabled
                mod.Disable()
                prop = newprop
                if (was) {
                    mod.Enable()
                }
                return mod
            },
            SetValue(newvalue) {
                const was = enabled
                mod.Disable()
                value = newvalue
                if (was) {
                    mod.Enable()
                }
                return mod
            },
        }

        mod.Enable()
        return mod
    }
}