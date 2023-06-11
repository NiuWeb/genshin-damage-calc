import { CombinateArrays } from "@src/utils/combinations/arrays"
import { ArrayObject, ArrayObjectDeep, CombinateArrayObjects } from "@src/utils/combinations/array_objects"
import { Artifacts, Combination, Weapon } from "./type"

/**
 * Configures the combinations to be generated.
 */
export class Combinator {

    private weapons: ArrayObject<Weapon>[] = []
    private artifacts: ArrayObject<Artifacts>[] = []

    /**
     * Adds a group of weapons to be combined.
     */
    public addWeapon(weapon: ArrayObject<Weapon>) {
        this.weapons.push(weapon)
    }

    /**
     * Adds a group of artifacts to be combined.
     */
    public addArtifacts(artifacts: ArrayObject<Artifacts>) {
        this.artifacts.push(artifacts)
    }

    /**
     * Generates all combinations.
     */
    public * generate() {
        const groups = CombinateArrays(this.weapons, this.artifacts)
        for (const group of groups) {
            const weapons = CombinateArrayObjects(group[0])
            for (const weapon of weapons) {
                const artifacts = CombinateArrayObjects(group[1])
                for (const artifact of artifacts) {
                    yield { weapon, artifact } as Combination
                }
            }
        }
    }

    public clear() {
        this.weapons = []
        this.artifacts = []
    }

    /**
     * Generates combinations from multiple groups.
     * Using this method, the results of two or more groups will be concatenated,
     * not combined.
     */
    public static * Generate(...combinations: ArrayObjectDeep<Combination>[]) {
        const combinator = new Combinator()
        for (const combination of combinations) {
            combinator.addWeapon(combination.weapon)
            combinator.addArtifacts(combination.artifact)
            yield* combinator.generate()
            combinator.clear()
        }
    }
}