import { Command, CommandList } from "../type"

type Result<V> = [command: Command<V>, args: string[], trace: string[]]
/**
 * Finds a command inside a list. Throws an error if the command has not been found
 * @param list The list of commands to search in
 * @param command The command string to search
 * @returns two values:
 * [0] found command, or undefined if not found.
 * [1] command arguments: the rest of the input command string
 * that is not a command.
 * [2] command trace.
 */
export function FindCommand<V>(list: CommandList<V>, command: string[]): Result<V> {
    for (let i = 0; i < command.length; i++) {
        const part = command[i]
        const child = list[part]
        if (!child) {
            throw new Error("Command not found: `" + command.slice(0, i + 1).join(" ") + "`")
        }
        // if command has no children or is the last in the list, send the rest of the values as arguments
        if (!child.children || i === command.length - 1) {
            return [child, command.slice(i + 1), command.slice(0, i + 1)]
        }
        list = child.children
    }
    throw new Error("Command not found: " + command.join(" "))
}