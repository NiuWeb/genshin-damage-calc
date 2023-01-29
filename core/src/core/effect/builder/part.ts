import { Options } from "../type"
import { BuilderQuery } from "./query"
import type { Builder } from "./builder"

export interface BuilderType {
    /** Limits the effects to be applied conditionally */
    Where(query: BuilderQuery): BuilderType
    /** Builds all the effect */
    Build(): Options["OnApply"]
    /** Creates a new effect builder */
    Next(): BuilderType
}
export abstract class BuilderPart implements BuilderType {
    constructor(protected builder: Builder) { }

    Next() {
        return this.builder.Next()
    }

    Build(): Options["OnApply"] {
        return this.builder.Build()
    }

    Where(query: BuilderQuery) {
        this.builder.Where(query)
        return this
    }

    /** runs when the effect is built */
    abstract onBuild(...args: Parameters<Options["OnApply"]>): void
    /** runs when the effect is enabled AND the query is true */
    abstract onEnable(...args: Parameters<Options["OnApply"]>): void
    /** runs when the effect is disabled OR the query is false */
    abstract onDisable(...args: Parameters<Options["OnApply"]>): void
}