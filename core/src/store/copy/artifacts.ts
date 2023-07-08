import { artbox, artifact, charbox } from "@src/core"

/**
 * Copies the artifacts from a character box to another.
 * It will keep the targets if the 4-piece set is the same.
 * 
 * - If the origin has no artifacts, the target artifacts will also be removed.
 * - If the origin has artifacts, but the target has no artifacts, the target
 *  will receive a new set of artifacts.
 * - If the origin has artifacts, but the target has different artifacts, the
 * target artifacts will be edited to match the origin. Effect targets in
 * this case will be lost.
 */
export function CopyArtifacts(copyFrom: charbox.Charbox, copyTo: charbox.Charbox) {
    const artifactsFrom = copyFrom.GetArtifacts()
    let artifactsTo = copyTo.GetArtifacts()

    // origin has no artifacts, just remove the target artifacts
    if (!artifactsFrom) {
        copyTo.SetArtifacts(undefined)
        return
    }

    // target has no artifacts, add a new set of artifacts
    if (!artifactsTo) {
        artifactsTo = new artbox.Artbox(copyTo)
        copyTo.SetArtifacts(artifactsTo)
    }

    const artifacts = artifactsTo
    const setFrom = artifactsFrom.GetActiveSets()
    const setTo = artifacts.GetActiveSets()
    const targets = (() => {
        const targets = new Map<string, readonly charbox.Charbox[]>()
        artifactsFrom.GetEffects().forEach((effect) => {
            const list = effect.GetTargets().map(char => (
                char === copyFrom ? copyTo : char
            ))
            targets.set(effect.Options.Name, list)
        })
        return targets
    })()

    artifacts.GetArtifacts().forEach((artTo, piece) => {
        const artFrom = artifactsFrom.Get(piece)
        artifact.Import(artifact.Export(artFrom), artTo)
    })


    // if set is the same, keep the targets
    if (setFrom.every(set => setTo.includes(set))) {
        artifacts.GetEffects().forEach((effect) => {
            const target = targets.get(effect.Options.Name)
            if (target) {
                effect.ApplyMultiple(target)
            }
        })
    }

}