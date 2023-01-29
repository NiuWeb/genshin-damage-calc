import { Character, Options } from "@core/character"
import { Charbox } from "@core/charbox"
import { stat } from "@core/stats"
import { Artbox } from "./artbox"

describe("Artifact box", () => {
    const char = new Charbox(new Character({ Stars: 4 } as Options))
    const arts = new Artbox(char)

    arts.Get(0).SetSet("A")
    arts.Get(1).SetSet("B")
    arts.Get(4).SetSet("A")
    arts.Get(3).SetSet("B")

    test("Sets are detected", () => {
        expect(new Set(arts.GetActiveSets())).toEqual(new Set(["a", "b"]))
    })
})

describe("Rolls summary", () => {
    const char = new Charbox(new Character({ Stars: 4 } as Options))
    const arts = new Artbox(char)

    arts.GetArtifacts().forEach(art => art.SetStars(5))
    arts.Get(0).AddSubstat(stat.CRIT_RATE, 0.066)
    arts.Get(0).AddSubstat(stat.CRIT_DMG, 0.132)
    arts.Get(3).AddSubstat(stat.CRIT_RATE, 0.033)
    arts.Get(3).AddSubstat(stat.CRIT_DMG, 0.132)

    test("calculate the rolls summary", () => {
        const {total} = arts.RollSummary()
        expect(total[4]).toBe(7)
    })
})