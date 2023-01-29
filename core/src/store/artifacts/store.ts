import { artifact } from "@src/core"
import { ReadOnly } from "@src/utils/readonly"
import { ArtifactFilter, FilterArtifacts, GeneralFilter } from "./filter"

/**
 * Stores and filters artifacts
 */
export class ArtifactStore {
    private list: ReadOnly<artifact.Exported>[] = []
    private filtered: ReadOnly<artifact.Exported>[] = []

    /** creates a new empty artifacts store
     * @param onChange function to trigger when any change occurs
     */
    constructor(private readonly onChange: () => void) { }

    /** forcely triggers the onChange function */
    Update() {
        this.onChange()
    }

    /** Gets all the artifacts stored */
    All(): readonly ReadOnly<artifact.Exported>[] {
        return this.list
    }

    /** Removes all artifacts from the store */
    Clear() {
        this.list.splice(0, this.list.length)
        this.filtered.splice(0, this.filtered.length)
        this.onChange()
    }

    /** Adds a new artifact to the store */
    Add(art: artifact.Artifact, mode: "unshift" | "push" = "push") {
        const exported = artifact.Export(art)
        this.list[mode](exported)
        this.filtered = [...this.list]
        this.onChange()
    }

    /** Adds an exported artifact to the store */
    AddExported(art: artifact.Exported, mode: "unshift" | "push" = "push") {
        this.list[mode](art)
        this.filtered = [...this.list]
        this.onChange()
    }

    /** Gets artifacts by the provided filter */
    Filter(filter: ArtifactFilter[], general?: GeneralFilter): readonly ReadOnly<artifact.Exported>[] {
        const { values } = FilterArtifacts(this.list, filter, general)
        this.filtered = values
        return values
    }

    /** Gets previously filtered artifacts */
    Get(): readonly ReadOnly<artifact.Exported>[] {
        return this.filtered
    }

    /** Replaces an existing artifact with another -in the same position.
     *  Returns true if the origin artifact was found and replaced.
     */
    Replace(origin: ReadOnly<artifact.Exported>, changed: ReadOnly<artifact.Exported>): boolean {
        const index = this.list.indexOf(origin)
        if (index === -1) {
            return false
        }
        this.list.splice(index, 1, changed)
        this.onChange()
        return true
    }

    /**
     * Removes the artifacts that matches with the given filter
     */
    RemoveMultiple(filter: ArtifactFilter[], general?: GeneralFilter): number {
        const { indexes } = FilterArtifacts(this.list, filter, general)
        const copy: ReadOnly<artifact.Exported>[] = []

        this.list.forEach((a, i) => {
            if (!indexes.includes(i)) {
                copy.push(a)
            }
        })
        this.list = copy
        this.onChange()
        return copy.length
    }
    /**
     * Removes a single artifact
     */
    Remove(art: ReadOnly<artifact.Exported>): boolean {
        const index = this.list.indexOf(art)
        if (index === -1) {
            return false
        }
        this.list.splice(index, 1)
        this.onChange()
        return true
    }
}