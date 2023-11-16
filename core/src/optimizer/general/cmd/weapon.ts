import { Dictionary } from "@bygdle/cmdlang"
import { weapons } from "@src/resources"
import { ArrayObject } from "@src/utils/combinations/array_objects"
import { searchSimilarStrings } from "@src/utils/search/similarity"
import { SplitString2D } from "@src/utils/strlist"
import { Weapon } from "../combinator"
import { getEffectArgs } from "./effect"

/**
 * Creates weapon combinations from arguments
 */
export class WeaponParser {
    /** all weapon names */
    private readonly namesAll: string[]
    /** 4* weapon names */
    private readonly names4: string[]
    /** 5* weapon names */
    private readonly names5: string[]

    /**
     * Creates a weapon combinations parser
     * @param type The weapon type (sword, claymore, etc). If not provided, all weapons will be used.
     */
    constructor(type?: number) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const list = Number.isFinite(type) ? weapons.GetByType(type!) : weapons.GetList()

        this.namesAll = list.map(x => x.Name.toLowerCase())
        this.names4 = list.filter(x => x.Stars === 4).map(x => x.Name.toLowerCase())
        this.names5 = list.filter(x => x.Stars === 5).map(x => x.Name.toLowerCase())
    }

    /**
     * Creates a weapon combination from the given arguments.
     */
    public Parse(name: string, args: Dictionary): ArrayObject<Weapon> {
        const names = this.parseName(name)
        const rank = SplitString2D(args["rank"] ?? "1", x => parseInt(x))[0]

        return { name: names, rank, ...getEffectArgs(args) }
    }

    /**
     * Gets the weapon names that are similar to the given name.
     */
    private parseName(name: string): string[] {
        if (name === "all") return this.namesAll

        if (name === "4*") {
            return this.names4
        }
        if (name === "5*") {
            return this.names5
        }

        const names = searchSimilarStrings({
            list: this.namesAll,
            query: name,
            count: 1,
            threshold: 0.4,
        })

        if (names.length === 0) {
            throw new Error(`Weapon name "${name}" not found`)
        }

        return names
    }
}