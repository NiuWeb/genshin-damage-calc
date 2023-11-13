import { foods } from "@src/resources"
import { Runner } from "@src/runner"

const adeptus = foods.FindByName("adeptustemptation")!

describe("Foods in a party", () => {
    const runner = new Runner()
    const party = runner.Scenario.Party

    const foods = party.GetFoods()

    runner.compileString(`
        character add bennett
        character add xiangling
        character add xingqiu
        character add sucrose
    `)()

    foods.Add(adeptus)

    const ef = foods.Get("adeptustemptation")!.Effect

    test("party is complete", () => (
        expect(party.GetMembers().length).toBe(4)
    ))

    test("one food is added", () => (
        expect(foods.GetAll().length).toBe(1)
    ))

    test("the food is applied to the entire party + the party handler", () => (
        expect(ef.GetTargets().length).toBe(5)
    ))
})