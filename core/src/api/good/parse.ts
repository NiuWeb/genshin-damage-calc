import { artifact, stats } from "@src/core"
import { Artifact, GOOD } from "./type"
import { MapPieces, MapStats } from "./data"
import { sets } from "@src/resources"

/** Parses an artifact from GOOD format */
export function ParseArtifact(art: Artifact): artifact.Artifact {
    const piece = MapPieces[art.slotKey]
    stats.piece.Name(piece)

    const real = new artifact.Artifact(piece)

    const set = sets.FindByName(art.setKey)
    if (!set) {
        console.warn(`Could not find artifacts set "${art.setKey}"`)
        real.SetSet(art.setKey)
    } else {
        real.SetSet(set.Name)
    }

    real.SetStars(art.rarity)
    real.SetLevel(art.level)

    const mainstat = MapStats[art.mainStatKey]
    stats.stat.Name(mainstat)

    real.SetMainstat(mainstat)

    for (const { key, value } of art.substats) {
        const stat = MapStats[key]
        stats.stat.Name(stat)
        let v = value
        if (!stats.FlatStats.includes(stat)) {
            v /= 100
        }
        if (!Number.isFinite(v) || v < 0) {
            throw new Error(`Invalid substat value: ${v}`)
        }
        real.AddSubstat(stat, v)
    }
    return real
}

/** Parses multiple artifacts from a Good file */
export function Parse(good: GOOD): artifact.Artifact[] {
    const artifacts = good.artifacts || []
    return artifacts.map(art => ParseArtifact(art))
}