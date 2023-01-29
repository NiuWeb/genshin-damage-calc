/**
 * An observer triggers a function when a subject' property
 * changes
 */
export interface Observer {
    /**
     * Property that is being observed
     */
    readonly prop: number
    /**
     * Checks if the observer is enabled
     */
    Enabled(): boolean
    /**
     * Enables the observer
     */
    Enable(): Observer
    /**
     * Disables the observer
     */
    Disable(): Observer
    /**
     * Removes the observer from its subject
     */
    Remove(): boolean
    /**
     * Forcely notifies the observer function, even
     * if the observer is disabled.
     * @param reason An object to pass as reason of the notification
     */
    Notify(reason?: unknown): Observer
}

/**
 * A modifier adds to a prop's value when enabled,
 * and subtracts when disabled
 */
export interface Modifier {
    /** title of the subject this modifier was created for */
    readonly Title: string
    /**
     * Checks if the modifier is enabled
     */
    Enabled(): boolean
    /**
     * Enables the modifier
     */
    Enable(): Modifier
    /**
     * Disables the modifier
     */
    Disable(): Modifier
    /**
     * Gets the property of the modifier
     */
    GetProp(): number
    /**
     * Gets the value of the modifier
     */
    GetValue(): number
    /**
     * Changes the modifier's prop
     * @param prop The new prop
     */
    SetProp(prop: number): Modifier
    /**
     * Changes the modifier's value
     * @param value The new value
     */
    SetValue(value: number): Modifier
}