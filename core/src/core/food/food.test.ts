import { Character } from "../character"
import { Charbox, Party } from "../charbox"
import { stat } from "../stats"
import { Factory } from "./food"
import { FoodType } from "./type"

describe("Food effects", () => {
    const char = new Charbox(new Character({
        Name: "Test",
        Stars: 4,
        Element: 0,
        Weapon: 0,
        BurstCost: 0,
        Region: 0
    }))

    const char2 = new Charbox(new Character({
        Name: "Test 2",
        Stars: 4,
        Element: 0,
        Weapon: 0,
        BurstCost: 0,
        Region: 0
    }))

    const gen = Factory({
        Type: FoodType.OFFENSIVE,
        Name: "Adeptus Temptation",
        Stars: 5,
        Effects: [
            [stat.ATK_FLAT, 260, 372],
            [stat.CRIT_RATE, 0.08, 0.12]
        ]
    })

    const food = gen(char)
    food.SetRank(3)

    new Party(char, char2)

    test("food should have correct name", () => {
        expect(food.Name).toBe("Adeptus Temptation")
    })

    test("delicious food atk buff should be applied", () => {
        food.SetRank(3)
        expect(char.GetCharacter().Get(stat.ATK)).toBeCloseTo(372)
        expect(char2.GetCharacter().Get(stat.ATK)).toBeCloseTo(372)
    })

    test("delicious food crit rate buff should be applied", () => {
        food.SetRank(3)
        expect(char.GetCharacter().Get(stat.CRIT_RATE)).toBeCloseTo(0.12 + 0.05)
        expect(char2.GetCharacter().Get(stat.CRIT_RATE)).toBeCloseTo(0.12 + 0.05)
    })

    test("normal food atk buff should be applied", () => { 
        food.SetRank(2)
        expect(char.GetCharacter().Get(stat.ATK)).toBeCloseTo(316)
        expect(char2.GetCharacter().Get(stat.ATK)).toBeCloseTo(316)
    })

    test("normal food crit rate buff should be applied", () => {
        food.SetRank(2)
        expect(char.GetCharacter().Get(stat.CRIT_RATE)).toBeCloseTo(0.1 + 0.05)
        expect(char2.GetCharacter().Get(stat.CRIT_RATE)).toBeCloseTo(0.1 + 0.05)
    })

    test("suspicious food atk buff should be applied", () => {
        food.SetRank(1)
        expect(char.GetCharacter().Get(stat.ATK)).toBeCloseTo(260)
        expect(char2.GetCharacter().Get(stat.ATK)).toBeCloseTo(260)
    })

    test("suspicious food crit rate buff should be applied", () => {
        food.SetRank(1)
        expect(char.GetCharacter().Get(stat.CRIT_RATE)).toBeCloseTo(0.08 + 0.05)
        expect(char2.GetCharacter().Get(stat.CRIT_RATE)).toBeCloseTo(0.08 + 0.05)
    })
})