import { piece, stat } from "@core/stats"
import { Artifact } from "./artifact"
import { Export, Import } from "./loader"

describe("Artifact loader", () => {
    test("export and import an artifact", () => {
        const art = new Artifact(piece.GOBLET)
        art.SetStars(5)
        art.SetLevel(19)
        art.SetMainstat(stat.HYDRO_DMG)
        art.SetSet("myset")

        art.AddSubstat(stat.CRIT_RATE, 0.113)
        art.AddSubstat(stat.CRIT_DMG, 0.078)
        art.AddSubstat(stat.ELEMENTAL_MASTERY, 61)
        art.AddSubstat(stat.ENERGY_RECHARGE, 0.065)

        const data = Export(art)

        const copy = new Artifact(piece.GOBLET)
        Import(data, copy)

        expect(copy.GetPiece()).toEqual(art.GetPiece())
        expect(copy.GetStars()).toEqual(art.GetStars())
        expect(copy.GetSet()).toEqual(art.GetSet())
        expect(copy.GetMainstat()).toEqual(art.GetMainstat())
        expect(copy.SubstatsLength()).toEqual(art.SubstatsLength())

        expect(copy.GetSubstat(0)).toEqual(art.GetSubstat(0))
        expect(copy.GetSubstat(1)).toEqual(art.GetSubstat(1))
        expect(copy.GetSubstat(2)).toEqual(art.GetSubstat(2))
        expect(copy.GetSubstat(3)).toEqual(art.GetSubstat(3))

        expect(copy.GetSubstatValue(0)).toBeCloseTo(art.GetSubstatValue(0))
        expect(copy.GetSubstatValue(1)).toBeCloseTo(art.GetSubstatValue(1))
        expect(copy.GetSubstatValue(2)).toBeCloseTo(art.GetSubstatValue(2))
        expect(copy.GetSubstatValue(3)).toBeCloseTo(art.GetSubstatValue(3))
    })
})