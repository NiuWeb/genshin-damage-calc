import { Logger } from "./logger/logger"

/** list of constatns */
export type Constants = {
    [name: string]: string
}

/** options to compile a command */
export interface CompileLineOptions {
    /** override the logger line with this value for the compiled command */
    line?: number
}

/** options to compile a command string */
export interface CompileStringOptions {
    /** predefined constants */
    constants?: Constants
}

/**
 * A basic compiled command is an executable function
 */
export interface CompiledBasic {
    (): void
}

/**
 * A compiled command is an executable function that stores
 * the original command string
 */
export interface Compiled extends CompiledBasic {
    String(): string
    toString(): string
}

/** A program has multiple executable commands */
export interface IProgram<Value> {
    /** an object defined on program creation that is passed to all commands */
    readonly Value: Value
    /** an object to send log messages in the program */
    readonly Log: Logger
    /** compiles a command into an executable function */
    Compile(cmd: string[], opts?: CompileLineOptions): Compiled
}
/**
 * A single command to execute
 */
export interface Command<Value> {
    /** command description */
    description: string
    /** command example string */
    example?: string
    /** 
     * command arguments list.
     * If undefined, the program will accept any number of arguments.
     * If an arguments list provided, it will accept that exact
     * number of arguments. If any of the arguments contains "...",
     * it will accept "n" or more arguments. For example:
     * 
     * ```
     * arguments: ["A", "B"] //accepts exactly 2 arguments
     * arguments: ["A", "B..."] //accepts 1 or more arguments
     * ```
     */
    arguments?: string[]
    /**
     * List of subcommands for this command
     */
    children?: CommandList<Value>
    /** recieves the command arguments and creates a compiled function to execute */
    compile?(prog: IProgram<Value>, args: string[]): CompiledBasic
}

/** multiple commands stored by their name */
export type CommandList<V> = {
    [command: string]: Command<V>
}
