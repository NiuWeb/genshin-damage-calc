import { defaultDomains } from "./resources/default/domains"
import { defaultUpgrades } from "./resources/default/upgrades"
import { BaseConfig } from "./type"

export const defaultConfig = (): BaseConfig => ({
    resourceCmd: info + "\n" + defaultDomains + "\n\n" + info2 + "\n" + defaultUpgrades,
    criteria: "damage"
})


const info = `
# Configures the resources obtained in each domain,
# and the resources required to adquire each upgrade.
# This data will be used to calculate the cost of each
# upgrade.
`.trim()

const info2 = `
# Configures the resources required by each upgrade.
# Levels, ascensions and talents require a certain
# amount of resources to be adquired, and so they
# have a cost associated with them.
# The cost will be calculated based on the resources
# configured here.
`