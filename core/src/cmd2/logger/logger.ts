import { Log, LoggerMethods, LogType } from "./type"
import { printf } from "fast-printf"
import { ColorizeArgs, LogString } from "./format"

/** stores and prints messages with format */
export class Logger implements LoggerMethods {
    /** A global logger for the entire program */
    static readonly Global = new Logger()

    /** Logger current line */
    Line = 1
    /** Whether to save sent logs in memory or not */
    SaveLogs = true
    /** Whether to insert ANSI colors to the logs or not */
    Colorize = true
    /** Whether to insert prefix in the form `[Line X] [STATUS]` to the logs */
    Prefix = true

    private logs: Log[] = []

    /** Function to execute when a log message is sent */
    Out: (log: Log) => void = (log) => console.log(this.LogString(log))

    private send(type: LogType, msg: string): Log {
        const log: Log = { type, msg, line: this.Line }
        if (this.SaveLogs) {
            this.logs.push(log)
        }
        this.Out(log)
        return log
    }

    private format(format: string, args: unknown[]): string {
        return this.Colorize ? (
            printf(ColorizeArgs("cyan", format), ...args)
        ) : (
            printf(format, ...args)
        )
    }

    /** gets the saved logs */
    GetLog(): readonly Log[] {
        return this.logs
    }
    /** clears the saved logs */
    Clear(): void {
        this.logs.splice(0, this.logs.length)
    }

    Log(msg: string) {
        return this.send("Log", msg)
    }
    Logf(format: string, ...args: unknown[]) {
        return this.send("Log", this.format(format, args))
    }

    Warn(msg: string) {
        return this.send("Warn", msg)
    }
    Warnf(format: string, ...args: unknown[]) {
        return this.send("Warn", this.format(format, args))
    }

    Error(msg: string) {
        return this.send("Error", msg)
    }
    Errorf(format: string, ...args: unknown[]) {
        return this.send("Error", this.format(format, args))
    }
    Throw(str: string): never {
        const { msg } = this.send("Error", str)
        throw msg
    }
    Throwf(format: string, ...args: unknown[]): never {
        const { msg } = this.send("Error", this.format(format, args))
        throw msg
    }

    /** converts the saved logs to a single string */
    String(): string {
        return this.logs
            .map(log => this.LogString(log))
            .join("\n")
    }

    /** converts the saved logs to a single string */
    toString(): string {
        return this.String()
    }
    /** transforms a log to string */
    LogString(log: Log): string {
        return LogString(this.Prefix, this.Colorize, log)
    }
}