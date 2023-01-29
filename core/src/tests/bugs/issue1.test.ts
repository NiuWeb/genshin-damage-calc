import { artbox, charbox, stats } from "@src/core"
import { characters } from "@src/resources"
import { Runner } from "@src/runner"
import { store } from "@src/store"


/** command to replicate the error in a test runner */
const initCmd = `
character add Xingqiu
artifact add
artifact sets EmblemOfSeveredFate 4
artifact stars 5
flower sub add energy_recharge 20%

character add Yelan
artifact add
artifact sets EmblemOfSeveredFate 4
artifact stars 5
flower sub add energy_recharge 10%
`

describe(`
    When loading a party with multiple instances of the same effect (multiple holders of EoSF4),
    a conflict occurs and the first effect instance is overrided by the behaviour of the second one.

    I have Xingqiu and Yelan with EoSF4 and they work correctly. But when I create a copy
    of the party using import/export methods, it happens that the Burst DMG of Xingqiu ends up
    depending of Yelan's ER, not Xingqiu's ER.
`, () => {
    test("Initial party loads correctly", () => {
        const runner = new Runner()
        runner.Program.Log.Out = () => void 0
        runner.Program.CompileString(initCmd)()
        const party = runner.Scenario.Party
        const { xingqiu, yelan } = getFromParty(party)

        expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
        expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
        expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
        expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)
    })

    test("Bug should not occurr when initial-loading the same party twice", () => {
        const runner1 = new Runner()
        runner1.Program.Log.Out = () => void 0
        runner1.Program.CompileString(initCmd)()
        const party1 = runner1.Scenario.Party
        const p1 = getFromParty(party1)
        console.log(">>>>>>> CREATE ANOTHER RUNNER")
        const runner2 = new Runner()
        runner2.Program.Log.Out = () => void 0
        runner2.Program.CompileString(initCmd)()
        const party2 = runner2.Scenario.Party
        const p2 = getFromParty(party2)

        expect(p1.Xingqiu).not.toEqual(p2.Xingqiu)
        expect(p1.Yelan).not.toEqual(p2.Yelan)
        expect(p1.xingqiu).not.toEqual(p2.xingqiu)
        expect(p1.yelan).not.toEqual(p2.yelan)

        expect(p1.xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
        expect(p1.yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
        expect(p1.xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
        expect(p1.yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)

        expect(p2.xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
        expect(p2.yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
        expect(p2.xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
        expect(p2.yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)
        console.log(">>>>>>> END CREATE ANOTHER RUNNER")
    })

    test("Bug should not occur when unapplying and re-applying the effects", () => {
        const runner = new Runner()
        runner.Program.Log.Out = () => void 0
        runner.Program.CompileString(initCmd)()
        const party = runner.Scenario.Party
        const { xingqiu, yelan, Xingqiu, Yelan } = getFromParty(party)

        const xqEosf4 = Xingqiu.GetArtifacts()!.GetEffects()[1]
        const ylEosf4 = Yelan.GetArtifacts()!.GetEffects()[1]

        expect(xqEosf4.Options.Name).toMatch(/emblemofseveredfate4/i)
        expect(ylEosf4.Options.Name).toMatch(/emblemofseveredfate4/i)

        console.log(">>>>>>> REAPPLY")
        xqEosf4.UnapplyAll()
        ylEosf4.UnapplyAll()


        ylEosf4.Apply(Yelan)
        xqEosf4.Apply(Xingqiu)


        expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
        expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
        expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
        expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)
        console.log(">>>>>>> END REAPPLY")
    })

    test("Bug should not occur when copying the party with `store.PartyFrom`", () => {
        const runner = new Runner()
        runner.Program.Log.Out = () => void 0
        runner.Program.CompileString(initCmd)()
        const party = runner.Scenario.Party

        console.log(">>>>>>> CREATE COPY PARTY")
        const copy = store.PartyFrom(charbox.ExportParty(party))
        const { xingqiu, yelan } = getFromParty(copy)
        expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
        expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
        expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
        expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)
        console.log(">>>>>>> END CREATE COPY PARTY")
    })

    test("Bug should not occur when re-creating another party and loading with `ImportParty`", () => {
        const runner = new Runner()
        runner.Program.Log.Out = () => void 0
        runner.Program.CompileString(initCmd)()
        const party = runner.Scenario.Party

        console.log(">>>>>>> CREATE COPY PARTY MANUALLY")
        const copy = new charbox.Party()
        const xq = characters.Xingqiu()
        const yl = characters.Yelan()

        xq.SetArtifacts(new artbox.Artbox(xq))
        yl.SetArtifacts(new artbox.Artbox(yl))
        copy.Add(xq)
        copy.Add(yl)

        charbox.ImportParty(charbox.ExportParty(party), copy)

        const { xingqiu, yelan } = getFromParty(copy)
        expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
        expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
        expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
        expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)
        console.log(">>>>>>> END CREATE COPY PARTY MANUALLY")
    })

})
/** Gets Xingqiu and Yelan from the party */
function getFromParty(party: charbox.Party) {
    const Xingqiu = party.GetMembers().find(s => s.GetCharacter().Options.Name === "Xingqiu")
    const Yelan = party.GetMembers().find(s => s.GetCharacter().Options.Name === "Yelan")
    if (!Xingqiu) {
        throw new Error("Xingqiu not found")
    }
    if (!Yelan) {
        throw new Error("Yelan not found")
    }
    return {
        Xingqiu, Yelan,
        xingqiu: Xingqiu.GetCharacter(),
        yelan: Yelan.GetCharacter(),
    }
}