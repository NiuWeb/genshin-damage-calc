import { charbox, stats } from "@src/core"
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

describe(
    `
    A variation of the Issue #1: somehow multiple instances of EoSF4 still conflicting each other.
    
    This time, clearing the enemy auras sets Yelan Burst DMG to the value that should be applied
    to Xingqiu, and reapplying Hydro aura fixes the problem.

    EDIT: The overriding also occur in the original party, so the bug should be in the
    effect class, not the export/import methods as thought in issue #1.

    EDIT 2: Programming the EoSF4 effect without the effect.Builder class solves the problem,
    i think I found the cause: the builder is instanciated ON THE EFFECT FACTORY, not
    when the effect is instanciated. This lets an unique effect builder for all instances
    of the effect, overriding the modifier but not the observers.

    To solve this, the builder should store each modifier (one per target) separately in a
    data structure like a map, not in a single property.
    `
    , () => {

        test("Initial party loads correctly", () => {
            const { xingqiu, yelan } = newRunner()

            expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
            expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
            expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
            expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)
        })

        test("Overriding does not occur in the original loaded party", () => {
            const { xingqiu, yelan } = newRunner()

            expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
            expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
            expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
            expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)

            yelan.GetEnemy().SetAuras(stats.aura.HYDRO)
            xingqiu.GetEnemy().SetAuras(stats.aura.HYDRO)

            expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
            expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
            expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
            expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)
        })

        test(
            `
            The order of effect updates affects this bug:
            Updating first Xingqiu effects and then Yelan ones doesn't generate a bug,
            `, () => {
            const { party } = newRunner()
            const copy = store.PartyFrom(charbox.ExportParty(party))
            const { xingqiu, yelan } = getFromParty(copy)

            expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
            expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
            expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
            expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)

            xingqiu.GetEnemy().SetAuras(stats.aura.HYDRO)
            yelan.GetEnemy().SetAuras(stats.aura.HYDRO)

            expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
            expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
            expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
            expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)

        })
        test(
            `
            The order of effect updates affects this bug:
            but updating Yelan first and then Xingqiu DOES cause the bug: 
            Xingqiu effect is overriding Yelan stats.
            `, () => {
            const { party } = newRunner()
            const copy = store.PartyFrom(charbox.ExportParty(party))
            const { xingqiu, yelan } = getFromParty(copy)

            expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
            expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
            expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
            expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)

            yelan.GetEnemy().SetAuras(stats.aura.HYDRO)
            xingqiu.GetEnemy().SetAuras(stats.aura.HYDRO)

            expect(xingqiu.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.4, 6)
            expect(yelan.Get(stats.stat.ENERGY_RECHARGE)).toBeCloseTo(1.3, 6)
            expect(xingqiu.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.4 * 0.25, 6)
            expect(yelan.Get(stats.stat.ELEMENTAL_BURST_DMG)).toBeCloseTo(1.3 * 0.25, 6)

        })

    })

function newRunner() {
    const runner = new Runner()
    runner.Program.Log.Out = () => void 0
    runner.Program.CompileString(initCmd)()
    const scenario = runner.Scenario
    const party = scenario.Party
    const cmd = runner.Program
    const Xingqiu = party.GetMembers().find(s => s.GetCharacter().Options.Name === "Xingqiu")
    const Yelan = party.GetMembers().find(s => s.GetCharacter().Options.Name === "Yelan")
    if (!Xingqiu) {
        throw new Error("Xingqiu not found")
    }
    if (!Yelan) {
        throw new Error("Yelan not found")
    }
    const xingqiu = Xingqiu.GetCharacter()
    const yelan = Yelan.GetCharacter()
    return { xingqiu, Xingqiu, yelan, Yelan, scenario, party, cmd }
}

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