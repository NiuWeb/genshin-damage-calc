import { Combinator } from "../combinator"
import { CombinatorCmd } from "./cmd"

const createCmd = () => {
    const cmd = new CombinatorCmd()
    cmd.Program.Log.Out = () => void 0
    return cmd
}

describe("Substats and filters are applied only when enabled", () => {
    test("disabled by default", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            weapon thecatch rank=1
            add
        `)()

        const group = cmd.Groups()[0]
        for (const combi of Combinator.Generate(group)) {
            expect(combi.artifact.substats).not.toBeDefined()
        }
    })


    test("enabled at start", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            substats enable
            weapon thecatch rank=1
            add
        `)()

        const group = cmd.Groups()[0]
        for (const combi of Combinator.Generate(group)) {
            expect(combi.artifact.substats).toBeDefined()
        }
    })


    test("enabled by defining range", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            substats range cr=0:10 cd=0:12
            weapon thecatch rank=1
            add
        `)()

        const group = cmd.Groups()[0]
        for (const combi of Combinator.Generate(group)) {
            expect(combi.artifact.substats).toBeDefined()
        }
    })

    test("enabled by defining default", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            substats default
            weapon thecatch rank=1
            add
        `)()

        const group = cmd.Groups()[0]
        for (const combi of Combinator.Generate(group)) {
            expect(combi.artifact.substats).toBeDefined()
        }

        console.log("\n" + cmd.Program.Log)
    })

    test("enabled by defining range and then disabling", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            substats range cr=0:10 cd=0:12
            weapon thecatch rank=1
            add

            substats disable
            weapon thecatch rank=5
            add
        `)()

        let group = cmd.Groups()[0]
        for (const combi of Combinator.Generate(group)) {
            expect(combi.artifact.substats).toBeDefined()
        }

        group = cmd.Groups()[1]
        for (const combi of Combinator.Generate(group)) {
            expect(combi.artifact.substats).not.toBeDefined()
        }
    })

})