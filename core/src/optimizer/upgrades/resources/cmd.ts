import { ReadOnly } from "@src/utils"
import { toNumber } from "@src/utils/conversions"
import { CalculateCost } from "../cost/calculate"
import { CostList } from "../cost/type"
import { ResourceList, ResourcePool, resourcePool } from "./pool"
import { Compiler, Program } from "@bygdle/cmdlang"

export class ResourceCmd extends Compiler<ResourcePool, void> {
    private readonly pool = resourcePool()

    private stars = [5]
    private pointer: "domains" | "upgrades" = "domains"
    private name?: string

    constructor() {
        super({} as Program<ResourcePool, void>)
        this.catch = false
        this.program = new Program(this.pool, {
            "domain": {
                name: "domain",
                description: "Sets the current domain to add resources to.",
                arguments: "name",
                compile: ({ values: [name] }, { logger }) => {
                    return () => {
                        if (!this.pool.domains[name]) {
                            this.pool.domains[name] = {}
                        }
                        this.pointer = "domains"
                        this.name = name
                        logger.log(`Domain set to ${name}`)
                    }
                }
            },
            "upgrade": {
                name: "upgrade",
                description: "Sets the current upgrade to add resources to," +
                    "in the currently selected stars with the `stars` command.",
                arguments: "name",
                compile: ({ values: [name] }, { logger }) => {
                    return () => {
                        for (const s of this.stars) {
                            if (!this.pool.upgrades[s][name]) {
                                this.pool.upgrades[s][name] = {}
                            }
                        }
                        this.pointer = "upgrades"
                        this.name = name
                        logger.log(`Upgrade set to ${name}`)
                    }
                }
            },
            "stars": {
                name: "stars",
                description: "Sets the current stars to add upgrades to.",
                arguments: "stars...",
                compile: ({ values: strvalues }, { logger }) => {
                    const stars = strvalues.map(toNumber)
                    return () => {
                        for (const s of stars) {
                            if (!this.pool.upgrades[s]) {
                                this.pool.upgrades[s] = {}
                            }
                        }
                        this.stars = stars
                        logger.log(`Stars set to ${stars}`)
                    }
                }
            },
            "cost": {
                name: "cost",
                description: "Sets the resin cost for the current domain.",
                arguments: "cost",
                compile: ({ values: [strval] }, { logger }) => {
                    const cost = toNumber(strval)
                    return () => {
                        const list = this.getLists()
                        for (const l of list) {
                            l.cost = cost
                        }
                        logger.log(`Resin cost set to ${cost}`)
                    }
                }
            },
            "resource": {
                name: "resource",
                description: "Adds a resource to the current domain or upgrade.",
                arguments: "name value",
                compile: ({ values: [name, strval] }, { logger }) => {
                    const value = toNumber(strval)
                    return () => {
                        const list = this.getLists()
                        for (const l of list) {
                            l[name] = value
                        }
                        logger.log(`Resource ${value} set to ${name}`)
                    }
                }
            }
        })
    }

    /**
     * Gets the resources list in the pointer
     */
    private getLists() {
        if (!this.name) {
            throw new Error("No domain or upgrade selected")
        }
        if (this.pointer === "domains") {
            const domain = this.pool.domains[this.name]
            if (!domain) {
                throw new Error(`No domain named ${this.name}`)
            }
            return [domain]
        }
        const upgrades: ResourceList[] = []
        for (const s of this.stars) {
            const upgrade = this.pool.upgrades[s][this.name]
            if (!upgrade) {
                throw new Error(`No upgrade named ${this.name}`)
            }
            upgrades.push(upgrade)
        }
        return upgrades
    }

    /**
     * Gets an object containing the domains and their resources
     */
    public GetDomains() {
        return this.pool.domains
    }

    /**
     * Gets a list with all the unique resources
     */
    public GetResources() {
        const resources = new Set<string>()
        for (const list of Object.values(this.pool.domains)) {
            for (const name of Object.keys(list)) {
                resources.add(name)
            }
        }
        for (const list of Object.values(this.pool.upgrades)) {
            for (const resource of Object.values(list)) {
                for (const name of Object.keys(resource)) {
                    resources.add(name)
                }
            }

        }

        return Array.from(resources)
    }

    /** gets all registered upgrade stars */
    public GetStars() {
        return Object.keys(this.pool.upgrades).map(toNumber)
    }

    /**
     * Gets the upgrades for a given star
     */
    public GetUpgrades(stars: number) {
        return this.pool.upgrades[stars]
    }

    /**
     * Gets the entire data pool as read-only
     */
    public GetPool(): ReadOnly<ResourcePool> {
        return this.pool
    }

    /**
     * Calculates the cost of all upgrades in all stars
     */
    public CalculateCost() {
        const result: { [stars: number]: CostList } = {}
        for (const _stars of Object.keys(this.pool.upgrades)) {
            const stars = toNumber(_stars)
            result[stars] = CalculateCost(this.GetPool(), stars, ...Object.keys(this.pool.upgrades[stars]))
        }
        return result
    }
}