import { Options, Character } from "@core/character"
import { stat } from "@core/stats"
import { AddCharacterScaling } from "./character"

describe("Character scaling", () => {
    const char = new Character({ Stars: 5 } as Options)
    AddCharacterScaling(char, {
        HpBase: [1210.7164, 4971.856],
        AtkBase: [8.2859, 34.0239],
        DefBase: [68.2062, 280.098],
        StatBonus: stat.CRIT_DMG,
    })

    test("Base stats of Hu Tao at level 90", () => {
        char.SetLevel(90)
        expect(char.Get(stat.HP_BASE)).toBeCloseTo(15552, -0.5)
        expect(char.Get(stat.ATK_BASE)).toBeCloseTo(106, -0.5)
        expect(char.Get(stat.DEF_BASE)).toBeCloseTo(876, -0.5)
    })
})