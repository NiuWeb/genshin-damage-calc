import type { Instance } from "@src/core/instance"

/** 
 * A value to filter a damage instance. 
 * If a string, will filter by exact name match.
 * If a regexp, will filter by regexp match.
 * If a function, will filter for return true.
 * */
export type InstanceFilter = string | RegExp | ((ins: Instance) => boolean)

/**
 * Filters from a list of instances.
 * @param instances Instances to filter.
 * @param filter Filter to apply.
 * @returns Filtered instances.
 */
export function InstanceFilter(instances: readonly Instance[], filters: InstanceFilter[]): Instance[] {

    const result: Instance[] = []

    for (const filter of filters) {
        if (typeof filter === "string") {
            const slice = instances.filter(ins => ins.Options.Name.toLowerCase() === filter.toLowerCase())
            slice.forEach(s => result.push(s))
        } else if (typeof filter === "function") {
            const slice = instances.filter(ins => filter(ins))
            slice.forEach(s => result.push(s))
        } else {
            const slice = instances.filter(ins => ins.Options.Name.match(filter))
            slice.forEach(s => result.push(s))
        }
    }
    return result
}