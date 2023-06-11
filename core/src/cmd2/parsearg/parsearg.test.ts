import { parseArg } from "./parsearg"

describe("Tests the argument parsing", () => {
    test("argument with no name", () => {
        const arg = parseArg("onlyvalue")
        expect(arg.name).toBe("")
        expect(arg.value).toEqual(["onlyvalue"])
    })

    test("argument with name and one value", () => {
        const arg = parseArg("name=value")
        expect(arg.name).toBe("name")
        expect(arg.value).toEqual(["value"])
    })

    test("argument with name and multiple values", () => {
        const arg = parseArg("name=value1,value2,value3")
        expect(arg.name).toBe("name")
        expect(arg.value).toEqual(["value1", "value2", "value3"])
    })

    test("argument with name and range", () => {
        const arg = parseArg("name=1:5")
        expect(arg.name).toBe("name")
        expect(arg.value).toEqual(["1", "2", "3", "4", "5"])
    })

    test("argument with name and range with multiple values", () => {
        const arg = parseArg("name=1:5,7,9:10")
        expect(arg.name).toBe("name")
        expect(arg.value).toEqual(["1", "2", "3", "4", "5", "7", "9", "10"])
    })

    test("argument with name and range with step", () => {
        const arg = parseArg("name=1:5:2")
        expect(arg.name).toBe("name")
        expect(arg.value).toEqual(["1", "3", "5"])
    })

    test("throws error on invalid range", () => {
        expect(() => parseArg("name=1:a")).toThrowError()
        expect(() => parseArg("name=a:1")).toThrowError()
        expect(() => parseArg("name=1:")).toThrowError()
        expect(() => parseArg("name=:1")).toThrowError()
        expect(() => parseArg("name=1:2:3:4")).toThrowError()
        expect(() => parseArg("name=1:2:0")).toThrowError()
        expect(() => parseArg("name=1::2")).toThrowError()
    })
})