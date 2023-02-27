import { SubstatTier } from "@core/scaling"
import { stat } from "@core/stats"
import { Horizontal } from "@src/strings/horizontal"
import { Table } from "@src/strings/table"
import { EquipRollsLp } from "./equip_lp2"

describe("Equip 45 rolls using the LP solver", () => {
    const solution = EquipRollsLp({
        stars: 5,
        tier: SubstatTier.ROLL_AVG,
        mainstats: [stat.HP_PERCENT, stat.PYRO_DMG, stat.CRIT_RATE],
        substats: [
            [stat.CRIT_RATE, 15],
            [stat.CRIT_DMG, 13],
            [stat.ELEMENTAL_MASTERY, 8],
            [stat.HP_PERCENT, 3],
            [stat.HP_FLAT, 3],
            [stat.ATK_PERCENT, 2],
            [stat.DEF_FLAT, 1],
        ]
    })

    const results = solution.map((subs, i) => {
        const table = new Table("Piece " + i, "# rolls")
        subs.forEach(sub => table.AddRow(stat.Name(sub[0]), sub[1]))
        return table.toString()
    })
    console.log(Horizontal(...results))

    const mainstats = [stat.HP_FLAT, stat.ATK_FLAT, stat.HP_PERCENT, stat.PYRO_DMG, stat.CRIT_RATE]

    const total = solution
        .map(subs => subs.reduce((a, [, b]) => a + b, 0))
        .reduce((a, b) => a + b, 0)

    test("All rolls are equipped", () => {
        expect(total).toBe(45)
    })

    for (let j = 0; j < 5; j++) {
        const subs = solution[j]
        const value = subs
            .map(([, v]) => Math.max(1, v))
            .reduce((a, b) => a + b, 0)
        test(`Artifact #${j} has 9 rolls at most, with enough space for 4 substats`, () => {
            expect(value).toBeLessThanOrEqual(9)
        })

        subs.forEach(([s, v], i) => {
            test(`Artifact #${j} | substat ${i} has 6 rolls at most`, () => {
                expect(v).toBeLessThanOrEqual(6)
            })
            test(`Artifact #${j} | substat ${i} is not repeated with the mainstat`, () => {
                expect(s).not.toBe(mainstats[j])
            })
        })
    }
})

describe("Equip 28 rolls using the LP solver", () => {
    const solution = EquipRollsLp({
        stars: 5,
        tier: SubstatTier.ROLL_AVG,
        mainstats: [stat.HP_PERCENT, stat.PYRO_DMG, stat.CRIT_RATE],
        substats: [
            [stat.CRIT_RATE, 15],
            [stat.CRIT_DMG, 13],
        ]
    })
    const mainstats = [stat.HP_FLAT, stat.ATK_FLAT, stat.HP_PERCENT, stat.PYRO_DMG, stat.CRIT_RATE]

    const total = solution
        .map(subs => subs.reduce((a, [, b]) => a + b, 0))
        .reduce((a, b) => a + b, 0)

    test("All rolls are equipped", () => {
        expect(total).toBe(28)
    })

    for (let j = 0; j < 5; j++) {
        const subs = solution[j]
        const value = subs
            .map(([, v]) => Math.min(1, v))
            .reduce((a, b) => a + b, 0)
        test(`Artifact #${j} has 9 rolls at most, with enough space for 4 substats`, () => {
            expect(value).toBeLessThanOrEqual(9)
        })

        subs.forEach(([s, v], i) => {
            test(`Artifact #${j} | substat ${i} has 6 rolls at most`, () => {
                expect(v).toBeLessThanOrEqual(6)
            })
            test(`Artifact #${j} | substat ${i} is not repeated with the mainstat`, () => {
                expect(s).not.toBe(mainstats[j])
            })
        })
    }
})


describe("Equip 25 rolls using the LP solver", () => {
    const solution = EquipRollsLp({
        stars: 5,
        tier: SubstatTier.ROLL_AVG,
        mainstats: [stat.HP_PERCENT, stat.PYRO_DMG, stat.CRIT_RATE],
        substats: [
            [stat.CRIT_RATE, 10],
            [stat.CRIT_DMG, 12],
            [stat.ELEMENTAL_MASTERY, 3],
        ]
    })
    const mainstats = [stat.HP_FLAT, stat.ATK_FLAT, stat.HP_PERCENT, stat.PYRO_DMG, stat.CRIT_RATE]

    const total = solution
        .map(subs => subs.reduce((a, [, b]) => a + b, 0))
        .reduce((a, b) => a + b, 0)

    test("All rolls are equipped", () => {
        expect(total).toBe(25)
    })

    for (let j = 0; j < 5; j++) {
        const subs = solution[j]
        const value = subs
            .map(([, v]) => Math.min(1, v))
            .reduce((a, b) => a + b, 0)
        test(`Artifact #${j} has 9 rolls at most, with enough space for 4 substats`, () => {
            expect(value).toBeLessThanOrEqual(9)
        })

        subs.forEach(([s, v], i) => {
            test(`Artifact #${j} | substat ${i} has 6 rolls at most`, () => {
                expect(v).toBeLessThanOrEqual(6)
            })
            test(`Artifact #${j} | substat ${i} is not repeated with the mainstat`, () => {
                expect(s).not.toBe(mainstats[j])
            })
        })
    }
})