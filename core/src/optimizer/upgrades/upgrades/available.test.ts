import { Runner } from "@src/runner"
import { getUpgrades } from "./available"
import { Upgrade } from "./upgrades"

describe("Available Upgrades are detected correcly", () => {
    test("character and talent levels with no constellation", () => {
        const runner = new Runner()
        runner.Program.CompileString(`
            character add xiangling
            character level 85
            character talent 1 9 10
        `)()
        const char = runner.Scenario.GetChar()

        // upgrades available are:
        // - level 90
        // - normal attack level 2
        // - elemental skill level 10

        const upgrades = getUpgrades(char)
        expect(upgrades).toHaveLength(3)

        // assert correct upgrades
        const types = upgrades.map(u => u.type)
        expect(types).toContain(Upgrade.CHARACTER_LEVEL)
        expect(types).toContain(Upgrade.NORMAL_ATTACK_LEVEL)
        expect(types).toContain(Upgrade.ELEMENTAL_SKILL_LEVEL)

        // assert correct values
        for (const upgrade of upgrades) {
            if (upgrade.type === Upgrade.CHARACTER_LEVEL) {
                expect(upgrade.value).toBe(90)
            }
            if (upgrade.type === Upgrade.NORMAL_ATTACK_LEVEL) {
                expect(upgrade.value).toBe(2)
            }
            if (upgrade.type === Upgrade.ELEMENTAL_SKILL_LEVEL) {
                expect(upgrade.value).toBe(10)
            }
        }
    })
    
    test("character and talent levels with constellation", () => {
        const runner = new Runner()
        runner.Program.CompileString(`
            character add xiangling
            character level 90
            character talent 1 9 10
            effect set xianglingC3
            effect enable
            effect set xianglingC5
            effect enable
            character show
        `)()
        const char = runner.Scenario.GetChar()

        // upgrades available are:
        // - normal attack level 2
        // - elemental skill level 10

        const upgrades = getUpgrades(char)
        expect(upgrades).toHaveLength(2)

        // assert correct upgrades
        const types = upgrades.map(u => u.type)
        expect(types).toContain(Upgrade.NORMAL_ATTACK_LEVEL)
        expect(types).toContain(Upgrade.ELEMENTAL_SKILL_LEVEL)

        // assert correct values
        for (const upgrade of upgrades) {
            if (upgrade.type === Upgrade.NORMAL_ATTACK_LEVEL) {
                expect(upgrade.value).toBe(2)
            }
            if (upgrade.type === Upgrade.ELEMENTAL_SKILL_LEVEL) {
                expect(upgrade.value).toBe(10)
            }
        }
    })
})