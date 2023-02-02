import { Options, Character } from "@core/character"
import { Charbox } from "@core/charbox"
import { Factory } from "../factory"
import { RunQuery } from "./query"

describe("Effect builder query", () => {
    test("Target query", () => {
        const char = new Charbox(new Character({ Stars: 4 } as Options))
        const ef = Factory({
            Name: "unnamed-effect",
            MaxAuras: 1,
            MaxConditions: 1,
            Conditions: ["ENABLED", "DISABLED"],
            OnApply() {
                return () => void 0
            },
        })(char)
        ef.Apply(char)

        let query = RunQuery({ target: { ascension: 4 } }, char, char, ef)
        expect(query).toBe(false)

        char.GetCharacter().SetLevel(65)
        query = RunQuery({ target: { ascension: 4 } }, char, char, ef)
        expect(query).toBe(true)

        query = RunQuery({ target: { shielded: true } }, char, char, ef)
        expect(query).toBe(false)

        query = RunQuery({ target: { shielded: false } }, char, char, ef)
        expect(query).toBe(true)

        char.GetCharacter().SetShield(true)
        query = RunQuery({ target: { shielded: true } }, char, char, ef)
        expect(query).toBe(true)

        query = RunQuery((target) => target.GetCharacter().Options.Stars === 4, char, char, ef)
        expect(query).toBe(true)
    })
})