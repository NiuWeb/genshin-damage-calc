/**
 * Delays execution of a function until a specific time.
 */
export class ActionDelayer<Params extends Array<unknown>, Return> {
    private counter = 0
    private completed = true
    private lastParam: Params | undefined
    private timer = -1

    /**
     * Creates an object that delays the execution of a given action.
     * @param delay The time (in ms) to delay the action execution
     * @param callback The action (a function) to execute
     */
    constructor(private delay: number, private callback: (...args: Params) => Return) { }

    private internalCall(counter: number, ...args: Params): void {
        if (!this.completed) return
        this.completed = false
        this.timer = window.setTimeout(() => {
            this.onReturn(this.callback(...args))
            this.completed = true
            if (this.counter !== counter) {
                if (this.lastParam) {
                    this.internalCall(this.counter, ...this.lastParam)
                }
            }
        }, this.delay)
    }
    /**
     * Executes the action function with the initially
     * specified delay.
     * @param args The parameters to pass.
     */
    public call(...args: Params): void {
        this.counter++
        this.lastParam = args
        this.internalCall(this.counter, ...args)
    }
    /**
     * Executes the action function instantly, with no delay
     * @param args The parameters to pass
     */
    public forceCall(...args: Params): void {
        this.onReturn(this.callback(...args))
    }
    /** cancels the last function call */
    public kill(): void {
        clearTimeout(this.timer)
        this.completed = true
    }

    /**
     * Triggers when the action returns a value.
     * @param result The value returned by the action
     */
    public onReturn: (result: Return) => void = () => void 0
}