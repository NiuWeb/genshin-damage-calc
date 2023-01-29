import { Logger } from "../logger"
import { Command, CommandList } from "../type"

/**
 * Generates a string with help about a command
 */
export function CommandHelp<T>(fullname: string, cmd: Command<T>): string {
    const logger = new Logger()
    logger.Out = () => void 0
    logger.Colorize = false
    logger.Prefix = false

    const args = (cmd.arguments || ["args..."]).map(x => "[" + x + "]")
    let description = cmd.description
        .split("\n")
        .join("\n")

    if (cmd.example) {
        description += "\n\n**Example:**\n```\n" + cmd.example + "\n```\n"
    }

    if (cmd.children) {
        description += `\n\nType \`help ${fullname}\` to show more about this subcommand`
    }
    logger.Logf("### Command `" + fullname + " %s".repeat(args.length) + "`:\n\n" + description + "\n\n", ...args)
    return logger.String()
}

/**
 * Generates a string with help about a command list
 */
export function CommandListHelp<T>(fullname: string, list: CommandList<T>): string {
    let str = ""
    for (const [name, cmd] of Object.entries(list)) {
        str += CommandHelp(fullname + " " + name, cmd) + "\n\n"
    }
    return str
}