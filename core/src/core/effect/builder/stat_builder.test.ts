import { stat } from "@core/stats"
import { Options, Character } from "@core/character"
import { Charbox } from "@core/charbox"
import { Builder } from "./builder"
import { Factory } from "../factory"

describe("Effect stat builder", () => {
    test("build an effect with stat modifier", () => {
        const char = new Charbox(new Character({ Stars: 4 } as Options))
        const effect = Factory({
            Name: "test-effect",
            MaxRank: 5,
            OnApply:
                new Builder()
                    .stat
                    .Char(stat.ELECTRO_DMG)
                    .Values(0.1, 0.2, 0.3, 0.4, 0.5)
                    .Build(),
        })(char)

        effect.Apply(char)
        effect.Enable()
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0.1, 6)

        effect.SetRank(3)
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0.3, 6)

        effect.Disable()
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0, 6)
    })
    test("build an effect with two stat modifiers", () => {
        const char = new Charbox(new Character({ Stars: 4 } as Options))
        const effect = Factory({
            Name: "test-effect",
            MaxRank: 5,
            OnApply:
                new Builder()
                    .stat
                    .Char(stat.ELECTRO_DMG)
                    .Values(0.1, 0.2, 0.3, 0.4, 0.5)
                    .Next()

                    .stat
                    .Char(stat.PYRO_DMG)
                    .Values(1, 2, 3, 4, 5)
                    .Build(),
        })(char)

        effect.Apply(char)
        effect.Enable()
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0.1, 6)
        expect(char.GetCharacter().Get(stat.PYRO_DMG)).toBeCloseTo(1, 6)

        effect.SetRank(3)
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0.3, 6)
        expect(char.GetCharacter().Get(stat.PYRO_DMG)).toBeCloseTo(3, 6)

        effect.Disable()
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0, 6)
        expect(char.GetCharacter().Get(stat.PYRO_DMG)).toBeCloseTo(0, 6)
    })
    test("build an effect with conditional stat modifier", () => {
        const char = new Charbox(new Character({ Stars: 4 } as Options))
        const effect = Factory({
            Name: "test-effect",
            MaxRank: 5,
            OnApply:
                new Builder()
                    .stat
                    .Char(stat.ELECTRO_DMG)
                    .Where({ target: { ascension: 4 } })
                    .Values(0.1, 0.2, 0.3, 0.4, 0.5)
                    .Build(),
        })(char)

        effect.Apply(char)
        effect.Enable()
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0, 6)

        effect.SetRank(3)
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0, 6)

        effect.Disable()
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0, 6)

        char.GetCharacter().SetLevel(90)

        effect.Enable()
        effect.SetRank(1)
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0.1, 6)

        effect.SetRank(3)
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0.3, 6)

        effect.Disable()
        expect(char.GetCharacter().Get(stat.ELECTRO_DMG)).toBeCloseTo(0, 6)
    })
})