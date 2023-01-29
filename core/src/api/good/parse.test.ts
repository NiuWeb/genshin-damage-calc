import { stats } from "@src/core"
import { ParseArtifact } from "./parse"

describe("Parse an artifact from GOOD", () => {
    const parsed = ParseArtifact({
        "setKey": "deepwoodMemories",
        "slotKey": "plume",
        "rarity": 5,
        "mainStatKey": "atk",
        "level": 20,
        "substats": [
            { "key": "enerRech_", "value": 6.5 },
            { "key": "critDMG_", "value": 12.4 },
            { "key": "critRate_", "value": 10.5 },
            { "key": "eleMas", "value": 61.0 }
        ],
        "lock": true,
    })

    test("set is parsed correctly", () => (
        expect(parsed.GetSet()).toBe("DeepwoodMemories")
    ))
    test("piece is parsed correctly", () => (
        expect(parsed.GetPiece()).toBe(stats.piece.PLUME)
    ))
    test("stars is parsed correctly", () => (
        expect(parsed.GetStars()).toBe(5)
    ))
    test("mainstat is parsed correctly", () => (
        expect(parsed.GetMainstat()).toBe(stats.stat.ATK_FLAT)
    ))
    test("number of substats is parsed correctly", () => (
        expect(parsed.SubstatsLength()).toBe(4)
    ))

    const expected = [
        [stats.stat.ENERGY_RECHARGE, 0.065],
        [stats.stat.CRIT_DMG, 0.124],
        [stats.stat.CRIT_RATE, 0.105],
        [stats.stat.ELEMENTAL_MASTERY, 61],
    ]
    expected.forEach(([stat, val], i) => test(`Substat ${i} is correct`, () => {
        expect(parsed.GetSubstat(i)).toBe(stat)
        expect(parsed.GetSubstatValue(i)).toBeCloseTo(val, 4)
    }))
})