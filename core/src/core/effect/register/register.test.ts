import { Options, Character } from "@core/character"
import { Normal } from "@core/instance"
import { stat } from "@core/stats"
import { Register } from "./register"

describe("Register objects", () => {
    test("Enable register", () => {
        const reg = new Register()
        const char = new Character({ Stars: 4 } as Options)
        const inst = Normal("my-instance", char)

        const mod = reg.Modifier(char.CreateModifier(stat.ATK_FLAT, 32))
        const obs = reg.Observer(char.CreateObserver(stat.ATK_FLAT, () => 0))
        const inf = reg.Infusion(char.AddInfusion(stat.PYRO_DMG, false))
        const mv = reg.Mv({ Stat: stat.ATK, Value: 3, Enabled: true }, inst)

        reg.Enable()
        expect(mod.Enabled()).toBe(true)
        expect(obs.Enabled()).toBe(true)
        expect(inf.Enabled).toBe(true)
        expect(mv.Enabled).toBe(true)
    })
    test("Disable register", () => {
        const reg = new Register()
        const char = new Character({ Stars: 4 } as Options)
        const inst = Normal("my-instance", char)

        const mod = reg.Modifier(char.CreateModifier(stat.ATK_FLAT, 32))
        const obs = reg.Observer(char.CreateObserver(stat.ATK_FLAT, () => 0))
        const inf = reg.Infusion(char.AddInfusion(stat.PYRO_DMG, false))
        const mv = reg.Mv({ Stat: stat.ATK, Value: 3, Enabled: true }, inst)

        reg.Disable()
        expect(mod.Enabled()).toBe(false)
        expect(obs.Enabled()).toBe(false)
        expect(inf.Enabled).toBe(false)
        expect(mv.Enabled).toBe(false)
    })
})