
export interface ResourceList {
    [name: string]: number
}
export interface ResourcePool {
    domains: {
        [domainName: string]: ResourceList
    }
    upgrades: {
        [stars: number]: {
            [upgradeName: string]: ResourceList
        }
    }
}

export const resourcePool = (): ResourcePool => ({
    domains: {},
    upgrades: {
        5: {},
        4: {},
        3: {},
    }
})