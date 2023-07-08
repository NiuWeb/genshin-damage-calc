import { charbox } from "@src/core"
import { CopyArtifacts } from "./artifacts"
import { CopyTalents } from "./talents"
import { CopyWeapon } from "./weapon"

/**
 * Copies the data from a character box to another, without
 * losing references to the original objects.
 * Effect that are kept will also save their targets.
 * 
 * Constellations from the origin won't be copied.
 */
export function CopyCharbox(copyFrom: charbox.Charbox, copyTo: charbox.Charbox) {
    CopyTalents(copyFrom, copyTo)
    CopyWeapon(copyFrom, copyTo)
    CopyArtifacts(copyFrom, copyTo)
}