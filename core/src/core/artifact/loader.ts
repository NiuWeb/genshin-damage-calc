import { piece } from "@core/stats"
import { ReadOnly } from "@src/utils"
import type { Artifact } from "./artifact"

/** artifact exported data */
export interface Exported {
    locked: boolean
    piece: number
    stars: number
    level: number
    set?: string
    mainstat: number
    substats: { stat: number, value: number }[]
}

/** exports artifact data */
export function Export(artifact: Artifact): Exported {
    const result: Exported = {
        locked: artifact.Locked,
        piece: artifact.GetPiece(),
        stars: artifact.GetStars(),
        level: artifact.GetLevel(),
        set: artifact.GetSet(),
        mainstat: artifact.GetMainstat(),
        substats: [],
    }
    for (let i = 0; i < artifact.SubstatsLength(); i++) {
        result.substats.push({ stat: artifact.GetSubstat(i), value: artifact.GetSubstatValue(i) })
    }
    return result
}
/** imports data to an artifact */
export function Import(data: ReadOnly<Exported>, artifact: Artifact): void {
    if (data.piece !== artifact.GetPiece()) {
        throw new Error(`Cannot import artifacts with incompatible pieces ${piece.Name(data.piece)} -> ${piece.Name(artifact.GetPiece())}`)
    }
    artifact.Locked = !!data.locked
    artifact.SetStars(data.stars)
    artifact.SetLevel(data.level)
    artifact.SetSet(data.set)
    artifact.SetMainstat(data.mainstat)

    data.substats.forEach(({ stat, value }, i) => {
        if (!Number.isFinite(value) || value < 0) {
            throw new Error(`Invalid substat ${i} value: ${value}`)
        }
        if (i < artifact.SubstatsLength()) {
            artifact.SetSubstat(i, stat)
            artifact.SetSubstatValue(i, value)
        } else {
            artifact.AddSubstat(stat, value)
        }
    })
}