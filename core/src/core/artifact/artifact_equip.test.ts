import { piece, stat } from "@core/stats"
import { Character, Options } from "@core/character"
import { Artifact } from "./artifact"

describe("Equip artifact to a character", () => {
    test("Equip mainstat", () => {
        const art = new Artifact(piece.GOBLET)
        art.SetStars(5)
        art.SetLevel(20)
        art.SetMainstat(stat.HYDRO_DMG)
    
        const char = new Character({ Stars: 4 } as Options)
    
        art.Equip(char)
        expect(char.Get(stat.HYDRO_DMG)).toBeCloseTo(0.466, 3)
        art.Unequip()
        expect(char.Get(stat.HYDRO_DMG)).toBeCloseTo(0, 3)
    })
    test("Add substats before equip artifact", () => {
        const art = new Artifact(piece.GOBLET)
        art.SetStars(5)
        art.SetLevel(20)
        art.SetMainstat(stat.HYDRO_DMG)
        art.AddSubstat(stat.CRIT_RATE, 0.15)
        art.AddSubstat(stat.CRIT_DMG, 0.14)
        art.AddSubstat(stat.ATK_PERCENT, 0.06)
        art.AddSubstat(stat.ELEMENTAL_MASTERY, 19)

        const char = new Character({ Stars: 4 } as Options)
        art.Equip(char)
    
        expect(char.Get(stat.CRIT_RATE)).toBeCloseTo(0.2, 3)
        expect(char.Get(stat.CRIT_DMG)).toBeCloseTo(0.64, 3)
        expect(char.Get(stat.ATK_PERCENT)).toBeCloseTo(0.06, 3)
        expect(char.Get(stat.ELEMENTAL_MASTERY)).toBeCloseTo(19, 3)
        art.Unequip()
        expect(char.Get(stat.CRIT_RATE)).toBeCloseTo(0.05, 3)
        expect(char.Get(stat.CRIT_DMG)).toBeCloseTo(0.5, 3)
        expect(char.Get(stat.ATK_PERCENT)).toBeCloseTo(0.0, 3)
        expect(char.Get(stat.ELEMENTAL_MASTERY)).toBeCloseTo(0, 3)
    })
    test("Add substats after equip artifact", () => {
        const art = new Artifact(piece.GOBLET)
        art.SetStars(5)
        art.SetLevel(20)
        art.SetMainstat(stat.HYDRO_DMG)

        const char = new Character({ Stars: 4 } as Options)
        art.Equip(char)

        art.AddSubstat(stat.CRIT_RATE, 0.15)
        art.AddSubstat(stat.CRIT_DMG, 0.14)
        art.AddSubstat(stat.ATK_PERCENT, 0.06)
        art.AddSubstat(stat.ELEMENTAL_MASTERY, 19)
    
        expect(char.Get(stat.CRIT_RATE)).toBeCloseTo(0.2, 3)
        expect(char.Get(stat.CRIT_DMG)).toBeCloseTo(0.64, 3)
        expect(char.Get(stat.ATK_PERCENT)).toBeCloseTo(0.06, 3)
        expect(char.Get(stat.ELEMENTAL_MASTERY)).toBeCloseTo(19, 3)
        art.Unequip()
        expect(char.Get(stat.CRIT_RATE)).toBeCloseTo(0.05, 3)
        expect(char.Get(stat.CRIT_DMG)).toBeCloseTo(0.5, 3)
        expect(char.Get(stat.ATK_PERCENT)).toBeCloseTo(0.0, 3)
        expect(char.Get(stat.ELEMENTAL_MASTERY)).toBeCloseTo(0, 3)
    })
})