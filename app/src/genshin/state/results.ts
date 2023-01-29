import { genshin } from "../core"

export class CalcResults {
    Rotation?: {
        summary: genshin.rotation.Summary
        details: genshin.rotation.Details
    }
    Substats?: genshin.optimizer.substats.Result[]
    Mainstat?: genshin.optimizer.mainstat.Result[]
    NextRoll?: genshin.optimizer.nextroll.Result[]
    Set?: genshin.optimizer.set.Result[]
    Weapon?: genshin.optimizer.weapon.Result[]
    Artifacts?: (genshin.optimizer.artifacts.Result | undefined)[]
}