import { piece, stat } from "@src/core/stats"
import { Scale } from "./transform"
import { Artifact } from "../artifact"

describe("Scale 5-star to 4-star", () => {
    const artifact = new Artifact(piece.FLOWER)
    artifact.SetStars(5)
    artifact.SetLevel(20)
    artifact.AddSubstat(stat.CRIT_DMG, 0.155)
    artifact.AddSubstat(stat.ELEMENTAL_MASTERY, 61)
    artifact.AddSubstat(stat.ATK_PERCENT, 0.047)
    artifact.AddSubstat(stat.CRIT_RATE, 0.113)

    const values = [0.155, 61, 0.047, 0.113]

    Scale(artifact, 4)

    for (let i = 0; i < 4; i++) {
        const value = artifact.GetSubstatValue(i)
        test(`sub ${i} has been reduced but not deleted`, () => {
            expect(value).toBeGreaterThan(0)
            expect(value).toBeLessThan(values[i])
        })
    }
})