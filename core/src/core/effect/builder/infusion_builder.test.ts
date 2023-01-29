import { stat } from "@core/stats"
import { Options, Character } from "@core/character"
import { Charbox } from "@core/charbox"
import { Builder } from "./builder"
import { Factory } from "../factory"
import { Normal } from "@core/instance"

describe("Effect infusion builder", () => {
    test("build an effect with an infusion", () => {
        const character = new Character({ Stars: 4 } as Options)
        const ins = Normal("my-ins", character)
        ins.Options.Infusion = true
        const char = Charbox.create({
            character,
            normals: [ins],
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
                    .infusion
                    .Set(stat.PYRO_DMG, false)
                    .Build(),
        })(char)

        expect(ins.GetElement()).toBe(stat.PHYSICAL_DMG)
        
        effect.Apply(char)
        effect.Enable()
        expect(ins.GetElement()).toBe(stat.PYRO_DMG)

        effect.Disable()
        expect(ins.GetElement()).toBe(stat.PHYSICAL_DMG)
    })
})