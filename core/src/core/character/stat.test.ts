import { stat } from "@core/stats"
import { Options, Character } from "./character"

describe("Character stats handling", () => {
    test("Total stats are computed correctly", () => {
        const char = new Character({ Stars: 4 } as Options)
        char.
            Set(stat.ATK_BASE, 561).
            Set(stat.ATK_PERCENT, 0.466).
            Set(stat.ATK_FLAT, 311)

        const want = 561 * 1.466 + 311
        const got = char.Get(stat.ATK)

        expect(got).toBeCloseTo(want, 6)
    })

    test("Talent levels are set correctly", () => {
        const char = new Character({ Stars: 4 } as Options)
        char.Set(stat.NORMAL_ATTACK_LEVEL, 9)

        let want = 9.0
        let got = char.Get(stat.NORMAL_ATTACK_LEVEL)
        expect(got).toBeCloseTo(want, 6)

        char.Set(stat.NORMAL_ATTACK_LEVEL_UP, 3)

        want = 12.0
        got = char.Get(stat.NORMAL_ATTACK_LEVEL)
        expect(got).toBeCloseTo(want, 6)

        char.Set(stat.NORMAL_ATTACK_LEVEL, 9)

        want = 9.0
        got = char.Get(stat.NORMAL_ATTACK_LEVEL)
        expect(got).toBeCloseTo(want, 6)

        want = 3.0
        got = char.Get(stat.NORMAL_ATTACK_LEVEL_UP)
        expect(got).toBeCloseTo(want, 6)
    })
})