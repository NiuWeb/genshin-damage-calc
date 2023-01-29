import { Options, Character } from "@core/character"
import { aura, stat } from "@core/stats"
import { Normal } from "./constructors"

describe("damage stats computation", () => {
    test("Sum of flat damage bonuses", () => {
        const char = character()

        const ins = Normal("my-instance", char)
        ins.Options.Element = stat.PYRO_DMG
        ins.Options.Talent = stat.CHARGED_ATTACK_DMG

        char.CreateModifier(stat.DMG_FLAT, 311)
        expect(ins.Get(stat.DMG_FLAT)).toBeCloseTo(311)

        char.CreateModifier(stat.PYRO_DMG_FLAT, 20)
        char.CreateModifier(stat.CRYO_DMG_FLAT, 50)
        expect(ins.Get(stat.DMG_FLAT)).toBeCloseTo(311 + 20)

        char.CreateModifier(stat.NORMAL_ATTACK_DMG_FLAT, 33)
        char.CreateModifier(stat.CHARGED_ATTACK_DMG_FLAT, 50)
        expect(ins.Get(stat.DMG_FLAT)).toBeCloseTo(311 + 20 + 50)

        ins.Subject.CreateModifier(stat.DMG_FLAT, 15)
        expect(ins.Get(stat.DMG_FLAT)).toBeCloseTo(311 + 20 + 50 + 15)

        ins.Subject.CreateModifier(stat.CRYO_DMG_FLAT, 34)
        expect(ins.Get(stat.DMG_FLAT)).toBeCloseTo(311 + 20 + 50 + 15)

        ins.Subject.CreateModifier(stat.PYRO_DMG_FLAT, 35)
        expect(ins.Get(stat.DMG_FLAT)).toBeCloseTo(311 + 20 + 50 + 15 + 35)
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