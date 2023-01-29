import { Damage } from "./damage"
import { CritType, DamageOptions, DamageStats, QuickenType } from "./options"

describe("Damage formulas", () => {
    test("An aggravated hit", () => {
        const stat = DamageStats({
            Char: 90,
            Enemy: 90,
            Base: 188.7 * 4006 / 100,
            Dmg: 0.466,
            Res: 0.1,
            Critrate: 0.865,
            Critdmg: 1.555,
            Em: 84,
        })

        const opts = DamageOptions({
            Base: true,
            Def: true,
            Res: true,
            Dmg: true,
            Quicken: QuickenType.QUICKEN_WEAK,
        })

        let got = Damage(stat, opts)
        let want = 6448.0
        expect(got).toBeCloseTo(want, -2)

        opts.Crit = CritType.CRIT
        got = Damage(stat, opts)
        want = 16474.0
        expect(got).toBeCloseTo(want, -2)
    })
})