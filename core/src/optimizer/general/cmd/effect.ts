/**
 * Formats effect arguments
 */
export function getEffectArgs(argsmap: Map<string, string[]>) {
    const stacks = (argsmap.get("stacks") ?? ["0"]).map(x => parseInt(x))
    const condition = (argsmap.get("condition") ?? [""]).map(x => x.split(";"))
    const aura = (argsmap.get("aura") ?? [""]).map(x => x.split(";"))
    const target = (argsmap.get("target") ?? [""]).map(x => x.split(";"))

    return { stacks, condition, aura, target }
}