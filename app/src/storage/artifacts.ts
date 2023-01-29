import { genshin } from "@src/genshin/core"
import { StorageLoad, StorageSave } from "./storage"

const prefix = "artifacts-inventory"

/** loads artifacts from localstorage */
export function LoadArtifacts(): genshin.artifact.Artifact[] {
    try {
        const local: genshin.artifact.Exported[] = JSON.parse(StorageLoad(prefix))
        const arts = local.map(data => {
            const art = new genshin.artifact.Artifact(data.piece)
            genshin.artifact.Import(data, art)
            return art
        })
        return arts
    } catch (e) {
        console.error("Error loading artifacts", e)
        return []
    }
}

/** saves artifacts to localstorage */
export function SaveArtifacts(artifacts: readonly genshin.utils.ReadOnly<genshin.artifact.Exported>[]) {
    const json = JSON.stringify(artifacts)
    StorageSave(prefix, json)
}