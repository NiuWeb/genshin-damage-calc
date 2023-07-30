import { defaultDomains } from "./resources/default/domains"
import { defaultUpgrades } from "./resources/default/upgrades"
import { BaseConfig } from "./type"

export const defaultConfig = (): BaseConfig => ({
    resourceCmd: info + "\n" + defaultDomains + "\n" + defaultUpgrades,
    criteria: "damage"
})


const info = `
# Configures the resources obtained in each domain,
# and the resources required to adquire each upgrade.
# This data will be used to calculate the cost of each
# upgrade.
`.trim()