import { character, } from "@src/core"

/** A stats filter */
export interface Filter {
  stat: number
  operator: "<=" | ">="
  value: number
}

/** Checks if a character matches with a the given filters.
 * multiple filters operates with AND.
 */
export function Filter(target: character.Character, ...filters: Filter[]): boolean {
  return filters.every(f => filter(target, f))
}

/** Checks if a character matches with a single filter */
function filter(target: character.Character, filter: Filter): boolean {
  const stat = target.Get(filter.stat)

  if (filter.operator === "<=") {
    return stat <= filter.value
  } else {
    return stat >= filter.value
  }
}