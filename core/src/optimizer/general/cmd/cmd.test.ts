import { Combinator } from "../combinator"
import { CombinatorCmd } from "./cmd"

const createCmd = () => {
    const cmd = new CombinatorCmd()
    cmd.Program.Log.Out = () => void 0
    return cmd
}
describe("combinations generation", () => {
    test("can generate if no artifacts defined", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            weapon thecatch rank=1,5
            add
        `)()

        const combi = Array.from(Combinator.Generate(...cmd.Groups()))
        expect(combi.length).toBe(2)
    })    
    test("can generate if no weapon defined", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            artifact main=atk%,atk%,cr/cd
            add
        `)()

        const combi = Array.from(Combinator.Generate(...cmd.Groups()))
        expect(combi.length).toBe(2)
    })
    
    test("can generate single weapon", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            weapon thecatch rank=1
            add
        `)()

        const combi = Array.from(Combinator.Generate(...cmd.Groups()))
        expect(combi.length).toBe(1)
    })  
    test("can generate single artifact", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            artifact main=atk%,atk%,cr
            add
        `)()

        const combi = Array.from(Combinator.Generate(...cmd.Groups()))
        expect(combi.length).toBe(1)
    })    
    test("can generate single weapon and artifact", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            weapon thecatch rank=1
            artifact main=atk%,atk%,cr
            add
        `)()

        const combi = Array.from(Combinator.Generate(...cmd.Groups()))
        expect(combi.length).toBe(1)
    })    
    test("can generate multiple weapons and single artifact", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            weapon thecatch rank=1,5
            artifact main=atk%,atk%,cr
            add
        `)()

        const combi = Array.from(Combinator.Generate(...cmd.Groups()))
        expect(combi.length).toBe(2)
    })     
    test("can generate single weapon and multiple artifacts", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            weapon thecatch rank=1
            artifact main=atk%/em,atk%,cr/cd
            add
        `)()

        const combi = Array.from(Combinator.Generate(...cmd.Groups()))
        expect(combi.length).toBe(4)
    }) 
       
    test("no combinations will work", () => {
        const cmd = createCmd()
        cmd.Program.CompileString(`
            add
        `)()

        const combi = Array.from(Combinator.Generate(...cmd.Groups()))
        expect(combi.length).toBe(1)
    }) 
})


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
            artifact main=atk%,atk%,atk%
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
            artifact main=atk%,atk%,atk%
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
            artifact main=atk%,atk%,atk%
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
            artifact main=atk%,atk%,atk%
            add

            substats disable
            artifact main=atk%,atk%,atk%
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