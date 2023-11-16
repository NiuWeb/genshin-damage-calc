import { stats } from "@src/core"
import { Runner } from "@src/runner"
import { GetUpgrades } from "./available"
import { EquipUpgrade } from "./equip"
import { Upgrade, UpgradeData } from "./upgrades"

describe("Available Upgrades are detected correcly", () => {
    test("character and talent levels with no constellation", () => {
        const runner = new Runner()
        runner.compileString(`
            character add xiangling
            character level 85
            character talent 1 9 10
        `)()
        const char = runner.Scenario.GetChar()

        // upgrades available are:
        // - level 90
        // - normal attack level 2
        // - elemental skill level 10

        const upgrades = GetUpgrades(char)
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

    test("character and talent levels with constellation #1", () => {
        const runner = new Runner()
        runner.compileString(`
            character add xiangling
            character level 80+

            effect set xianglingC3
            effect enable
            effect set xianglingC5
            effect enable

            character talent 1 11 11
        `)()
        const char = runner.Scenario.GetChar()

        // upgrades available are:
        // - level 90
        // - normal attack level 2
        // - elemental skill level 12
        // - elemental burst level 12

        const upgrades = GetUpgrades(char)
        expect(upgrades).toHaveLength(4)

        // assert correct upgrades
        const types = upgrades.map(u => u.type)
        expect(types).toContain(Upgrade.CHARACTER_LEVEL)
        expect(types).toContain(Upgrade.NORMAL_ATTACK_LEVEL)
        expect(types).toContain(Upgrade.ELEMENTAL_SKILL_LEVEL)
        expect(types).toContain(Upgrade.ELEMENTAL_BURST_LEVEL)

        // assert correct values
        for (const upgrade of upgrades) {
            if (upgrade.type === Upgrade.CHARACTER_LEVEL) {
                expect(upgrade.value).toBe(90)
            }
            if (upgrade.type === Upgrade.NORMAL_ATTACK_LEVEL) {
                expect(upgrade.value).toBe(2)
            }
            if (upgrade.type === Upgrade.ELEMENTAL_SKILL_LEVEL) {
                expect(upgrade.value).toBe(9)
            }
            if (upgrade.type === Upgrade.ELEMENTAL_BURST_LEVEL) {
                expect(upgrade.value).toBe(9)
            }
        }
    })

    test("character and talent levels with constellation", () => {
        const runner = new Runner()
        runner.compileString(`
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

        const upgrades = GetUpgrades(char)
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

    test("character level and ascension from low level", () => {
        const runner = new Runner()
        runner.compileString(`
            character add xiangling
            character level 1
            character talent 1 1 1
            weapon set thecatch
            weapon level 1
        `)()
        const char = runner.Scenario.GetChar()

        let upgrades: UpgradeData[]
        do {
            upgrades = GetUpgrades(char)
            for (const upgrade of upgrades) {
                const cmd = EquipUpgrade(upgrade)
                console.log({ upgrade, cmd })
                runner.compileString(cmd)()
            }
        } while (upgrades.length > 0)

        const charr = char.GetCharacter()
        expect(charr.GetLevel()).toBe(90)
        expect(charr.GetAscension()).toBe(6)
        expect(charr.Get(stats.stat.NORMAL_ATTACK_LEVEL)).toBe(10)
        expect(charr.Get(stats.stat.ELEMENTAL_SKILL_LEVEL)).toBe(10)
        expect(charr.Get(stats.stat.ELEMENTAL_BURST_LEVEL)).toBe(10)

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const weapon = char.GetWeapon()!
        expect(weapon.GetLevel()).toBe(90)
        expect(weapon.GetAscension()).toBe(6)

    })
})