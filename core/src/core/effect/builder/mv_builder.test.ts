import { stat } from "@core/stats"
import { Options, Character } from "@core/character"
import { Charbox } from "@core/charbox"
import { Builder } from "./builder"
import { Factory } from "../factory"
import { Normal } from "@core/instance"

describe("Effect MVs builder", () => {
    test("build an effect with an MV", () => {
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
                    .mv
                    .Mv(stat.ATK, 0.5, "my-ins")
                    .Build(),
        })(char)

        expect(ins.Base.GetMvs().length).toBe(0)
        
        effect.Apply(char)
        effect.Enable()
        expect(ins.Base.GetMvs().length).toBe(1)
        expect(ins.Base.GetMvs()[0].Enabled).toBe(true)
        expect(ins.Base.GetMvs()[0].Value).toBeCloseTo(0.5, 6)

        effect.Disable()
        expect(ins.Base.GetMvs()[0].Enabled).toBe(false)

        effect.Unapply(char)
        expect(ins.Base.GetMvs().length).toBe(0)
    })
})