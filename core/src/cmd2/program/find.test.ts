import { CommandList } from "../type"
import { FindCommand } from "./find"

describe("Find a command in a list", () => {
    const list: CommandList<void> = {
        "run": {
            description: "run",
            compile() {
                return () => console.log("running")
            }
        },
        "util": {
            description: "util test",
            children: {
                "red": {
                    description: "red",
                    compile() {
                        return () => console.log("red!!")
                    }
                },
                "blue": {
                    description: "blue",
                    compile() {
                        return () => console.log("blue!!")
                    }
                }
            }
        }
    }

    test("find main command `run` with no arguments", () => {
        const [cmd, args] = FindCommand(list, ["run"])
        expect(cmd).toBeDefined()
        expect(cmd?.description).toBe("run")
        expect(args.length).toBe(0)
    })
    test("find main command `run` with arguments", () => {
        const [cmd, args] = FindCommand(list, ["run", "arg"])
        expect(cmd).toBeDefined()
        expect(cmd?.description).toBe("run")
        expect(args.length).toBe(1)
        expect(args[0]).toBe("arg")
    })
    test("find main command `util` with no arguments", () => {
        const [cmd, args] = FindCommand(list, ["util"])
        expect(cmd).toBeDefined()
        expect(cmd?.description).toBe("util test")
        expect(args.length).toBe(0)
    })
    test("find subcommand `util blue` with no arguments", () => {
        const [cmd, args] = FindCommand(list, ["util", "blue"])
        expect(cmd).toBeDefined()
        expect(cmd?.description).toBe("blue")
        expect(args.length).toBe(0)
    })
    test("find subcommand `util blue` with arguments", () => {
        const [cmd, args] = FindCommand(list, ["util", "blue", "arg"])
        expect(cmd).toBeDefined()
        expect(cmd?.description).toBe("blue")
        expect(args.length).toBe(1)
        expect(args[0]).toBe("arg")
    })

    test("Throws an error if command not found", () => {
        expect(() => (
            FindCommand(list, ["twenty", "blue", "arg"])
        )).toThrow()
    })
    test("Throws an error if subcommand not found", () => {
        expect(() => (
            FindCommand(list, ["util", "green", "arg"])
        )).toThrow()
    })
})