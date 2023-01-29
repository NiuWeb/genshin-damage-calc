import { Options, Character } from "@core/character"
import { Charbox } from "@core/charbox"
import { Builder } from "./builder"
import { Factory } from "../factory"

describe("Effect Instance builder", () => {
    test("build an effect with an extra instance", () => {
        const character = new Character({ Stars: 4 } as Options)
        const char = Charbox.create({
            character,
            normals: [],
            bursts: [],
            skills: [],
            tr: [],
            extra: [],
            effects: []
        })
        const effect = Factory({
            Name: "test-effect",
            MaxRank: 5,
            OnApply:
                new Builder()
                    .instance
                    .Options({
                        Name: "my-ins",
                        Element: 0,
                        Talent: 0
                    })
                    .Build(),
        })(char)

        let ins = char.FindExtra("my-ins")
        expect(ins).not.toBeDefined()

        effect.Apply(char)
        effect.Enable()
        ins = char.FindExtra("my-ins")
        expect(ins).toBeDefined()
        expect(ins?.Options.Name).toBe("my-ins")

        effect.Disable()
        ins = char.FindExtra("my-ins")
        expect(ins).not.toBeDefined()

        effect.Unapply(char)
        ins = char.FindExtra("my-ins")
        expect(ins).not.toBeDefined()
    })
})