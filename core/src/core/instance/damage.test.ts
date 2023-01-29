import { Options, Character } from "@core/character"
import { aura, stat } from "@core/stats"
import { Normal, Transformative } from "./constructors"

describe("damage instances calculation", () => {
    test("Normal damage instance", () => {
        const char = character()

        const ins = Normal("my-instance", char)
        ins.Options.Element = stat.PYRO_DMG
        ins.Options.Talent = stat.CHARGED_ATTACK_DMG
        ins.Base.CreateMv(stat.ATK, 242.6 / 100)

        let got = ins.DmgNoCrit(true)
        let want = 28859.0
        expect(got).toBeCloseTo(want, -2)

        got = ins.DmgCrit(true)
        want = 99044
        expect(got).toBeCloseTo(want, -2)

        got = ins.DmgAvg(true)
        want = 88586
        expect(got).toBeCloseTo(want, -2)
    })

    test("Transformative damage instance", () => {
        const char = character()
        const ins = Transformative(stat.OVERLOAD_DMG, undefined, char)

        const got = ins.DmgNoCrit(true)
        const want = 10639.0
        expect(got).toBeCloseTo(want, -2)
    })
})

function character(): Character {
    const char = new Character({ Stars: 4 } as Options)
    char.SetLevel(90)
    char.Set(stat.ATK_FLAT, 4640)
    char.Set(stat.PYRO_DMG, 0.466 + 0.15 + 0.33)
    char.Set(stat.ALL_DMG, 0.115)
    char.Set(stat.ELEMENTAL_MASTERY, 369)
    char.Set(stat.CRIT_RATE, 0.851)
    char.Set(stat.CRIT_DMG, 2.432)

    const enemy = char.GetEnemy()
    enemy.Subject.Set(stat.LEVEL, 90)
    enemy.Subject.Set(stat.PYRO_RES, -0.1)
    enemy.SetAuras(aura.HYDRO)
    return char
}