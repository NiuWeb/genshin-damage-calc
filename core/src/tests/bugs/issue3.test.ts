import { charbox } from "@src/core"
import { Runner } from "@src/runner"
import { store } from "@src/store"

const initCmd = `
character add hutao
character add yelan
effect set yelanA4
effect unapply yelan
effect apply hutao
`

describe("Effects with `MaxTargets` are not exported/imported with party loaders", () => {
    test("Initial run should apply the effect correctly", () => {
        const rn = new Runner()
        rn.Program.CompileString(initCmd)()
        const ef = rn.Scenario.Effect!

        const applied = ef.GetTargets().map(s => s.GetCharacter().Options.Name)
        expect(applied.includes("HuTao")).toBe(true)
    })
    test("Imported party should apply the effect correctly", () => {
        const rn = new Runner()
        rn.Program.CompileString(initCmd)()

        const copy = store.PartyFrom(charbox.ExportParty(rn.Scenario.Party))
        rn.Scenario.Party = copy
        rn.Program.CompileString("character set yelan\neffect set yelanA4")()
        const ef = rn.Scenario.Effect!

        const applied = ef.GetTargets().map(s => s.GetCharacter().Options.Name)
        console.log({ applied })
        expect(applied.includes("HuTao")).toBe(true)
    })
})