import { piece, stat } from "@core/stats"
import { Artifact } from "./artifact"

describe("Count artifact rolls is deterministic", () => {
    const createArtifact = () => {
        const artifact = new Artifact(piece.FLOWER)
        artifact.SetStars(5)
        artifact.SetLevel(20)
        artifact.AddSubstat(stat.CRIT_DMG, 0.155)
        artifact.AddSubstat(stat.ELEMENTAL_MASTERY, 61)
        artifact.AddSubstat(stat.ATK_PERCENT, 0.047)
        artifact.AddSubstat(stat.CRIT_RATE, 0.113)
        return artifact
    }


    test("artifact rolls string (brute) is always the same", () => {
        let previous: string | undefined = undefined
        for (let i = 0; i < 100; i++) {
            const artifact = createArtifact()
            const rolls = artifact.Rolls("brute")
            const string = JSON.stringify(rolls)
            if (previous === undefined) {
                previous = string
            } else {
                expect(string).toEqual(previous)
            }
        }
    })
    test("artifact rolls string (auto) is always the same", () => {
        let previous: string | undefined = undefined
        for (let i = 0; i < 100; i++) {
            const artifact = createArtifact()
            const rolls = artifact.Rolls("auto")
            const string = JSON.stringify(rolls)
            if (previous === undefined) {
                previous = string
            } else {
                expect(string).toEqual(previous)
            }
        }
    })
})