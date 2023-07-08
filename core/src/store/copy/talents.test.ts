import { stats } from "@src/core"
import { Runner } from "@src/runner"
import { CopyTalents } from "./talents"

describe("Talent levels copy", () => {
    test("copy from C0 to C5", () => {
        const origin = createOrigin()
        const target = createTarget()

        CopyTalents(origin, target)
        const tChar = target.GetCharacter()

        expect(tChar.Get(stats.stat.NORMAL_ATTACK_LEVEL)).toBe(5)
        expect(tChar.Get(stats.stat.ELEMENTAL_SKILL_LEVEL)).toBe(9)
        expect(tChar.Get(stats.stat.ELEMENTAL_BURST_LEVEL)).toBe(10)
    })

    test("copy from C5 to C0", () => {
        const origin = createTarget()
        const target = createOrigin()

        CopyTalents(origin, target)
        const tChar = target.GetCharacter()

        expect(tChar.Get(stats.stat.NORMAL_ATTACK_LEVEL)).toBe(8)
        expect(tChar.Get(stats.stat.ELEMENTAL_SKILL_LEVEL)).toBe(9)
        expect(tChar.Get(stats.stat.ELEMENTAL_BURST_LEVEL)).toBe(10)
    })
})

function createOrigin() {
    const runner = new Runner()
    runner.Program.CompileString(`
        character add hutao
        character talent 5 6 7
    `)()
    return runner.Scenario.GetChar()
}

function createTarget() {
    const runner = new Runner()
    runner.Program.CompileString(`
        character add hutao
        effect set hutaoc3
        effect enable
        effect set hutaoc5
        effect enable
        character talent 8 12 13
    `)()
    return runner.Scenario.GetChar()
}