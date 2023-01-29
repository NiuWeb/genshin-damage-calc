import { piece, stat } from "@core/stats"
import { Artifact } from "./artifact"

describe("Artifact handling", () => {
    test("invalid mainstats should not be assigned", () => {
        const art = new Artifact(piece.GOBLET)
        art.SetMainstat(stat.HP_FLAT)
        expect(art.GetMainstat()).not.toBe(stat.HP_FLAT)
    })
    test("valid mainstats should be assigned", () => {
        const art = new Artifact(piece.GOBLET)
        art.SetMainstat(stat.DEF_PERCENT)
        expect(art.GetMainstat()).toBe(stat.DEF_PERCENT)
    })
    test("Level should be limited by stars", () => {
        const art = new Artifact(piece.SANDS)
        art.SetStars(4)
        art.SetLevel(20)
        expect(art.GetLevel()).toBe(16)
    })

    test("repeated substat should not be added", () => {
        const art = new Artifact(piece.FLOWER)
        art.AddSubstat(stat.HP_FLAT, 299)
        expect(art.SubstatsLength()).toBe(0)
        art.AddSubstat(stat.HP_PERCENT, 0.11)
        art.AddSubstat(stat.HP_PERCENT, 0.5)
        expect(art.SubstatsLength()).toBe(1)
    })

    test("substats should be swapped", () => {
        const art = new Artifact(piece.FLOWER)

        art.AddSubstat(stat.CRIT_RATE, 0.06)
        art.AddSubstat(stat.CRIT_DMG, 0.12)

        art.SetSubstat(1, stat.CRIT_RATE)

        expect(art.GetSubstat(0)).toBe(stat.CRIT_DMG)
        expect(art.GetSubstat(1)).toBe(stat.CRIT_RATE)
        expect(art.GetSubstatValue(0)).toBeCloseTo(0.12, 3)
        expect(art.GetSubstatValue(1)).toBeCloseTo(0.06, 3)
    })

    test("Mainstat should swap substat", () => {
        const art = new Artifact(piece.GOBLET)
        art.SetMainstat(stat.ATK_PERCENT)
        art.AddSubstat(stat.HP_PERCENT, 0)

        art.SetMainstat(stat.HP_PERCENT)
        
        expect(art.GetSubstat(0)).toBe(stat.ATK_PERCENT)
    })
})