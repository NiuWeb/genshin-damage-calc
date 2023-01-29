import { SetOptimizer } from "./optimizer"

describe("Set combinations", () => {
    test("By default, 3 combinations of Crimson4 are generated (for 0, 1 and 3 stacks)", () => {
        const optimizer = new SetOptimizer()
        optimizer.Combinate({})
        const combinations = Array.from(optimizer.Generate())

        const count = combinations
            .filter(s => Object
                .keys(s.cmds)
                .find(s => s.match(/flames4/i))
            ).length
        expect(count).toBe(3)
    })
    test("When adding a custom configuration to Crimson4, it will be generated only one combination", () => {
        const optimizer = new SetOptimizer()
        optimizer.Combinate({
            ConfigCmd: `
            case CrimsonWitchOfFlames4:
                effect stacks 2
        `})
        const combinations = Array.from(optimizer.Generate())

        const count = combinations
            .filter(s => Object
                .keys(s.cmds)
                .find(s => s.match(/flames4/i))
            ).length
        expect(count).toBe(1)
    })
    test("When adding a custom configuration to Crimson4, generated combination has the custom code", () => {
        const optimizer = new SetOptimizer()
        optimizer.Combinate({
            ConfigCmd: `
            case CrimsonWitchOfFlames4:
                effect stacks 2
        `})
        const combinations = Array.from(optimizer.Generate())

        const value = combinations
            .find(s => Object
                .keys(s.cmds)
                .find(s => s.match(/flames4/i))
            )
        const str = value?.cmds["CrimsonWitchOfFlames4"][0].trim()

        expect(str).toBe("effect stacks 2")
    })
})