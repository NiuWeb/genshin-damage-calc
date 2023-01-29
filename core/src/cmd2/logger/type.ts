/** message types that can be sent to the logger */
export type LogType = "Log" | "Warn" | "Error"

/** functions to send messages to the logger */
export type LoggerMethods = {
    [log in LogType]: (msg: string) => Log
} & {
        [log in LogType as `${log}f`]: (format: string, ...args: unknown[]) => Log
    }
/** a message sent to the logger */
export interface Log {
    /** message type */
    type: LogType
    /** line in the program */
    line: number
    /** message sent */
    msg: string
}