import { Factory as CharFactory } from "@core/charbox"
import { region, stat, weapon } from "@core/stats"
import { WeaponScaling } from "@core/scaling"
import { Factory } from "./factory"

describe("Equip a Homa (without effects) to Hu Tao", () => {
    test("weapon stats adds correctly", () => {
        const char = charf()
        const wp = wpf(char)

        char.GetCharacter().SetLevel(90)
        wp.SetLevel(90)

        expect(char.GetCharacter().Get(stat.ATK_BASE)).toBeCloseTo(715, -0.5)
        expect(char.GetCharacter().Get(stat.CRIT_DMG)).toBeCloseTo(0.884 + 0.662, -0.5)

        
        wp.SetLevel(1)
        expect(char.GetCharacter().Get(stat.ATK_BASE)).toBeCloseTo(152, -0.5)
        expect(char.GetCharacter().Get(stat.CRIT_DMG)).toBeCloseTo(0.884 + 0.144, -0.5)
    })

    test("Equips and unequips correctly", () => {
        const char = charf()
        char.GetCharacter().SetLevel(90)

        const wp1 = wpf(char).Unequip()
        const wp2 = wpf(char).Unequip()

        wp1.SetLevel(90)
        wp2.SetLevel(1)

        expect(char.GetCharacter().Get(stat.ATK_BASE)).toBeCloseTo(106, -0.5)
        expect(char.GetCharacter().Get(stat.CRIT_DMG)).toBeCloseTo(0.884, -0.5)

        wp1.Equip(char)
        expect(char.GetCharacter().Get(stat.ATK_BASE)).toBeCloseTo(715, -0.5)
        expect(char.GetCharacter().Get(stat.CRIT_DMG)).toBeCloseTo(0.884 + 0.662, -0.5)

        wp1.Unequip()
        wp2.Equip
    })
})


const charf = CharFactory({
    Name: "HuTao",
    Element: stat.PYRO_DMG,
    Stars: 5,
    Weapon: weapon.POLEARM,
    Region: region.NONE,
    HpBase: [1210.7164, 4971.856],
    AtkBase: [8.2859, 34.0239],
    DefBase: [68.2062, 280.098],
    StatBonus: stat.CRIT_DMG,
    Normals: [],
    Skills: [],
    Bursts: [],
    Extra: [],
    Effects: [],
    BurstCost: 60
})

const wpf = Factory({
    Name: "StaffOfHoma",
    Type: weapon.POLEARM,
    Stars: 5,
    Scaling: WeaponScaling.TYPE_46,
    Substat: stat.CRIT_DMG,
    Effects: []
})