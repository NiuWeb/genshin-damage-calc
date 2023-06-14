import { CombinateArrays } from "@src/utils/combinations/arrays"
import { ArrayObject, CombinateArrayObject, CountArrayObject } from "@src/utils/combinations/array_objects"
import { Artifacts, Combination, Weapon, CombinationGroup } from "./type"

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
     * Gets the weapons, or an array with a single empty item 
     * if no weapons are defined.
     */
    public getWeapons(): ArrayObject<Weapon>[] {
        if (this.weapons.length > 0) {
            return this.weapons
        }
        return [{ empty: [true], name: [""], rank: [0] }]
    }

    /**
     * Adds a group of artifacts to be combined.
     */
    public addArtifacts(artifacts: ArrayObject<Artifacts>) {
        this.artifacts.push(artifacts)
    }

    /**
     * Gets the artifacts, or an array with a single empty item
     * if no artifacts are defined.
     */
    public getArtifacts(): ArrayObject<Artifacts>[] {
        if (this.artifacts.length > 0) {
            return this.artifacts
        }
        return [{ empty: [true], sands: [0], goblet: [0], circlet: [0] }]
    }

    /**
     * Generates all combinations.
     */
    public * generate() {
        const groups = CombinateArrays(this.getWeapons(), this.getArtifacts())
        for (const group of groups) {
            const weapons = CombinateArrayObject(group[0])
            for (const weapon of weapons) {
                const artifacts = CombinateArrayObject(group[1])
                for (const artifact of artifacts) {
                    yield { weapon, artifact } as Combination
                }
            }
        }
    }

    /** gets the combination groups */
    public get(): CombinationGroup {
        return { weapon: this.weapons, artifact: this.artifacts }
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
    public static * Generate(...combinations: CombinationGroup[]) {
        const combinator = new Combinator()
        for (const combination of combinations) {
            for (const weapon of combination.weapon) {
                combinator.addWeapon(weapon)
            }
            for (const artifact of combination.artifact) {
                combinator.addArtifacts(artifact)
            }
            yield* combinator.generate()
            combinator.clear()
        }
    }

    /**
     * Counts the number of combinations that will be generated in the given groups.
     */
    public static Count(...combinations: CombinationGroup[]) {
        let result = 0
        for (const combination of combinations) {
            const weapons = combination.weapon
                .map(weapon => CountArrayObject(weapon))
                .reduce((a, b) => a + b, 0)
            const artifacts = combination.artifact
                .map(artifact => CountArrayObject(artifact))
                .reduce((a, b) => a + b, 0)
            result += weapons * artifacts
        }
        return result
    }
}