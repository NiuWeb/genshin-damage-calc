import { aura, stat } from "@core/stats"
import { Options, Character } from "./character"
import { Import, Export } from "./loader"

describe("Binary character loader", () => {
    test("Encode and decode", () => {
        const char = new Character({ Stars: 4 } as Options)
        char.SetLevel(65)
        char.SetAscension(4)
        char.Set(stat.NORMAL_ATTACK_LEVEL, 6)
        char.Set(stat.ELEMENTAL_SKILL_LEVEL, 7)
        char.Set(stat.ELEMENTAL_BURST_LEVEL, 8)
        
        char.GetEnemy().SetLevel(35)
        char.GetEnemy().SetAuras(aura.CRYO, aura.QUICKEN)

        const data = Export(char)

        const copy = new Character({ Stars: 4 } as Options)
        Import(data, copy)

        expect(copy.GetLevel()).toBe(char.GetLevel())
        expect(copy.GetAscension()).toBe(char.GetAscension())
        expect(copy.Get(stat.NORMAL_ATTACK_LEVEL)).toBe(char.Get(stat.NORMAL_ATTACK_LEVEL))
        expect(copy.Get(stat.ELEMENTAL_SKILL_LEVEL)).toBe(char.Get(stat.ELEMENTAL_SKILL_LEVEL))
        expect(copy.Get(stat.ELEMENTAL_BURST_LEVEL)).toBe(char.Get(stat.ELEMENTAL_BURST_LEVEL))

        expect(copy.GetEnemy().GetLevel()).toBe(char.GetEnemy().GetLevel())
        expect(new Set(copy.GetEnemy().GetAuras())).toEqual(new Set(char.GetEnemy().GetAuras()))
    })
})