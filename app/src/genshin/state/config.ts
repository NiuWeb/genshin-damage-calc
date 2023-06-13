import { genshin } from "../core"

export const calcConfig = () => ({
    Workers: navigator.hardwareConcurrency || 4,
    Substats: genshin.optimizer.substats.defaultConfig(),
    Mainstat: genshin.optimizer.mainstat.defaultConfig(),
    NextRoll: genshin.optimizer.nextroll.defaultConfig(),
    Set: genshin.optimizer.set.defaultConfig(),
    Weapon: genshin.optimizer.weapon.defaultConfig(),
    General: genshin.optimizer.general.defaultConfig(),
    Artifacts: genshin.optimizer.artifacts.defaultConfig(),
    Inventory: {
        filters: [] as genshin.store.ArtifactFilter[],
        general: {} as genshin.store.GeneralFilter
    }
})