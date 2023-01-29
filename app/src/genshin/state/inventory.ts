import { LoadArtifacts, SaveArtifacts } from "@src/storage/artifacts"
import { genshin } from "../core"

export class CalcInventory {
    constructor() {
        const data = LoadArtifacts()
        this.Store = new genshin.store.ArtifactStore(() => {
            SaveArtifacts(this.Store.All())
        })

        data.forEach(art => this.Store.Add(art))
    }
    readonly Store: genshin.store.ArtifactStore
}