import { CommandHelp, CommandListHelp } from "./help"
import { Logger } from "../logger/logger"
import type { CommandList, Compiled, CompileLineOptions, CompileStringOptions, IProgram } from "../type"
import { FindCommand } from "./find"
import { CountArgs, LowerCase, WrapCompiled } from "./utils"
import { ParseString } from "./parse/string"

/**
 * a program has multiple executable commands
 */
export class Program<V> implements IProgram<V> {
    /** creates a command program
     * @param Value an "state" value to pass to all commands
     */
    constructor(public readonly Value: V) { }
    private commands: CommandList<V> = {}

    /** Program logger. Defaults the global logger */
    Log = Logger.Global

    /** run commands as case insensitive? */
    IgnoreCase = true
    /** 
     * Only print errors in the logger instead of breaking the program
     * */
    Catch = true

    /** sets the program commands */
    Set(commands: CommandList<V>) {
        this.commands = commands
        return this
    }
    /** gets the program commands */
    Get(): CommandList<V> {
        return this.commands
    }

    /** compiles a command */
    Compile(cmd: string[], opts?: CompileLineOptions): Compiled {
        const currLine = this.Log.Line
        const newLine = opts?.line || currLine
        // move log to input line
        this.Log.Line = newLine

        /** logs an error and returns it again */
        const logAndError = (e: unknown) => {
            // move log to input line
            this.Log.Line = newLine
            // log error
            if (typeof e === "string") { // string throws are custom errors already logged
                // restore original line
                this.Log.Line = currLine
                e = new Error(e)
            } else { // other kind are different errors that should be logged
                this.Log.Error(String(e).valueOf())
                // restore original line
                this.Log.Line = currLine
            }
            if (!this.Catch) {
                throw e
            }
            return e
        }

        try {
            if (this.IgnoreCase) {
                LowerCase(cmd)
            }
            const [command, args, trace] = FindCommand(this.commands, cmd)

            const fullName = trace.join(" ")
            if (!command.compile) {
                const { msg } = this.Log.Errorf("Command `%s` is defined but has no `.compile()` method", fullName)
                throw msg
            }

            const [minArgs, maxArgs] = CountArgs(command.arguments)

            if (args.length < minArgs) {
                const { msg } = this.Log.Errorf("Command `%s` requires at least %d arguments, but %d were provided.", fullName, minArgs, args.length)
                throw msg
            }
            if (args.length > maxArgs) {
                const { msg } = this.Log.Errorf("Command `%s` requires at most %d arguments, but %d were provided.", fullName, maxArgs, args.length)
                throw msg
            }

            // compile
            const body = command.compile(this, args)
            // restore original line
            this.Log.Line = currLine

            return WrapCompiled(cmd.join(" "), () => {
                const currLine = this.Log.Line
                // move log to input line
                this.Log.Line = newLine
                // run compiled code
                try {
                    body()
                } catch (e) {
                    logAndError(e)
                }
                // restore original line
                this.Log.Line = currLine
            })
        } catch (e) {
            throw logAndError(e)
        }
    }

    /** compiles a command string */
    CompileString(input: string, opts?: CompileStringOptions) {
        const commands = ParseString(input, opts, this.Log)

        const fns: Compiled[] = []
        for (const { cmd, line } of commands) {
            const fn = this.Compile(cmd, { line })
            fns.push(fn)
        }

        const str = fns.map(fn => fn.String()).join("\n")
        return WrapCompiled(str, () => fns.forEach(fn => fn()))
    }

    /** gets a help string for a command */
    Help(cmd: string[]): string {
        if (!cmd.length || cmd[0].trim() === "") {
            return CommandListHelp("", this.commands)
        }
        if (this.IgnoreCase) {
            LowerCase(cmd)
        }
        const [command, , trace] = FindCommand(this.commands, cmd)
        let str = CommandHelp(trace.join(" "), command)
        if (command.children) {
            str += "\n\n" + CommandListHelp(trace.join(" "), command.children)
        }
        return str
    }

    /** lists the full commands in the program */
    GetCommands(): string[] {
        const result: string[] = []

        function walk(list: CommandList<V>, trace: string[]) {
            for (const [name, cmd] of Object.entries(list)) {
                const full = [...trace, name]
                result.push(full.join(" "))
                if (cmd.children) {
                    walk(cmd.children, full)
                }
            }
        }
        walk(this.commands, [])
        return result
    }
}