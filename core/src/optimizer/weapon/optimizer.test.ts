import { WeaponOptimizer } from "./optimizer"

describe("Weapon combinations", () => {
    test("By default, 3 combinations of Blackcliff are generated (for 0, 1 and 3 stacks)", () => {
        const optimizer = new WeaponOptimizer()
        optimizer.Combinate({ All: true })
        const combinations = Array.from(optimizer.Generate())

        const count = combinations
            .filter(s => Object
                .keys(s.cmds)
                .find(s => s.match(/blackcliffpole/i))
            ).length
        expect(count).toBe(3)
    })
    test("When adding a custom configuration to Blackcliff, it will be generated only one combination", () => {
        const optimizer = new WeaponOptimizer()
        optimizer.Combinate({
            All: true,
            ConfigCmd: `
            case BlackcliffPole1:
                effect stacks 2
        `})
        const combinations = Array.from(optimizer.Generate())

        const count = combinations
            .filter(s => Object
                .keys(s.cmds)
                .find(s => s.match(/blackcliffpole/i))
            ).length
        expect(count).toBe(1)
    })
    test("When adding a custom configuration to Blackcliff, generated combination has the custom code", () => {
        const optimizer = new WeaponOptimizer()
        optimizer.Combinate({
            All: true,
            ConfigCmd: `
            case BlackcliffPole1:
                effect stacks 2
        `})
        const combinations = Array.from(optimizer.Generate())

        const value = combinations
            .find(s => Object
                .keys(s.cmds)
                .find(s => s.match(/blackcliffpole/i))
            )
        const str = value?.cmds["BlackcliffPole1"][0].trim()

        expect(str).toBe("effect stacks 2")
    })
})