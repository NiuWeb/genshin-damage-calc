import { stat } from "@core/stats"
import { CountRollsBruteForce } from "./count_brute"
import { CountRollsLp } from "./count_lp"

describe("Test substats counter by LP", () => {
    test("A 5* artifact at +20", () => {
        const result = CountRollsLp({
            level: 20,
            stars: 5,
            substats: [
                [stat.CRIT_DMG, 0.155],
                [stat.ELEMENTAL_MASTERY, 61],
                [stat.ATK_PERCENT, 0.047],
                [stat.CRIT_RATE, 0.113],
            ]
        })
        expect(new Set(result[0][1])).toEqual(new Set([0, 0, 0, 2]))
        expect(new Set(result[1][1])).toEqual(new Set([0, 1, 2, 0]))
        expect(new Set(result[2][1])).toEqual(new Set([0, 1, 0, 0]))
        expect(new Set(result[3][1])).toEqual(new Set([0, 0, 1, 2]))
    })
})
describe("Test substats counter by brute force", () => {
    test("A 5* artifact at +20", () => {
        const result = CountRollsBruteForce({
            level: 20,
            stars: 5,
            substats: [
                [stat.CRIT_DMG, 0.155],
                [stat.ELEMENTAL_MASTERY, 61],
                [stat.ATK_PERCENT, 0.047],
                [stat.CRIT_RATE, 0.113],
            ]
        })
        expect(new Set(result[0][1])).toEqual(new Set([0, 0, 0, 2]))
        expect(new Set(result[1][1])).toEqual(new Set([0, 1, 2, 0]))
        expect(new Set(result[2][1])).toEqual(new Set([0, 1, 0, 0]))
        expect(new Set(result[3][1])).toEqual(new Set([0, 0, 1, 2]))
    })

    test("brute force counter is deterministic", () => {
        let previous: string | undefined = undefined
        for (let i = 0; i < 100; i++) {
            const result = CountRollsBruteForce({
                level: 20,
                stars: 5,
                substats: [
                    [stat.CRIT_DMG, 0.155],
                    [stat.ELEMENTAL_MASTERY, 61],
                    [stat.ATK_PERCENT, 0.047],
                    [stat.CRIT_RATE, 0.113],
                ]
            })
            const string = JSON.stringify(result)
            if (previous === undefined) {
                previous = string
            } else {
                expect(string).toEqual(previous)
            }
        }
     })
})