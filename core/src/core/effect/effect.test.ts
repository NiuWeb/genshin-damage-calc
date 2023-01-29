import { Options, Character } from "@core/character"
import { Charbox } from "@core/charbox/charbox"
import { stat } from "@core/stats"
import { Factory } from "./factory"

describe("Effect property handling", () => {
    test("Apply to characters", () => {
        const A = new Charbox(new Character({ Stars: 4 } as Options))
        const B = new Charbox(new Character({ Stars: 4 } as Options))

        const factory = Factory({
            Name: "test-effect",
            ApplyOther: true,
            OnApply(target, effect, register) {
                expect(target.GetCharacter().Options.Name).toBe(B.GetCharacter().Options.Name)
                expect(effect.Owner.GetCharacter().Options.Name).toBe(A.GetCharacter().Options.Name)
                register.Modifier(target.GetCharacter().CreateModifier(stat.ATK_FLAT, 311))
                return () => void 0
            },
        })
        const effect = factory(A)

        effect.Apply(B)
        expect(B.GetCharacter().Get(stat.ATK_FLAT)).toBeCloseTo(0, 6)

        effect.Enable()
        expect(B.GetCharacter().Get(stat.ATK_FLAT)).toBeCloseTo(311, 6)

        effect.Disable()
        expect(B.GetCharacter().Get(stat.ATK_FLAT)).toBeCloseTo(0, 6)
    })

    test("Apply conditions", () => {
        const A = new Charbox(new Character({ Stars: 4 } as Options))
        const factory = Factory({
            Name: "test-effect",
            Conditions: ["ENABLED", "DISABLED"],
            MaxConditions: 1,
            OnApply() {
                return () => void 0
            },
        })
        const effect = factory(A)
        effect.Apply(A)
        
        effect.SetConditions("ENABLED")
        expect(effect.HasCondition("ENABLED")).toBe(true)
 
        effect.SetConditions()
        expect(effect.HasCondition("ENABLED")).toBe(false)
    })
})