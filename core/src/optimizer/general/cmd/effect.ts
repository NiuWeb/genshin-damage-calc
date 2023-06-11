import { parseArg } from "@src/cmd2/parsearg"

export function parseArgsmap(args: string[]): Map<string, string[]> {
    const argsmap = new Map<string, string[]>()
    for (const arg of args) {
        const parsed = parseArg(arg)
        argsmap.set(parsed.name, parsed.value)
    }
    return argsmap
}
export function getEffectArgs(argsmap: Map<string, string[]>) {
    const stacks = (argsmap.get("stacks") ?? ["0"]).map(x => parseInt(x))
    const condition = (argsmap.get("condition") ?? [""]).map(x => x.split(";"))
    const aura = (argsmap.get("aura") ?? [""]).map(x => x.split(";"))

    return { stacks, condition, aura }
}