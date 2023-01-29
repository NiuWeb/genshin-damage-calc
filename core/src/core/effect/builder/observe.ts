import type { Builder } from "./builder"

export class BuilderObserve {
    constructor(private builder: Builder) { }
    private target: number[] = []
    private owner: number[] = []
    private party = false
    /** Set the target stats to observe */
    Target(...stats: number[]): Builder {
        this.target = stats
        return this.builder
    }
    /** Set the owner stats to observe */
    Owner(...stats: number[]): Builder {
        this.owner = stats
        return this.builder
    }
    /** Set whether to observe changes in the target party */
    Party(observe: boolean): Builder {
        this.party = observe
        return this.builder
    }

    /** Gets the stats to observe in target */
    getTarget(): readonly number[] {
        return this.target
    }
    /** Gets the stats to observe in owner */
    getOwner(): readonly number[] {
        return this.owner
    }
    /** Checks whether observe party */
    getParty(): boolean {
        return this.party
    }
}