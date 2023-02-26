import { SubstatTier } from "@src/core/scaling"
import { stat } from "@src/core/stats"
import { Horizontal } from "@src/strings/horizontal"
import { Table } from "@src/strings/table"
import { EquipRollsLp } from "./equip_lp2"

describe("Equip 45 rolls using the LP solver", () => {
    console.time("elapsed")
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
    console.timeEnd("elapsed")

    const results = solution.map((subs, i) => {
        const table = new Table("Piece " + i, "# rolls")
        subs.forEach(sub => table.AddRow(stat.Name(sub[0]), sub[1]))
        return table.toString()
    })
    console.log(Horizontal(...results))

    const total = solution
        .map(subs => subs.reduce((a, [, b]) => a + b, 0))
        .reduce((a, b) => a + b, 0)

    test("All rolls are equipped", () => {
        expect(total).toBe(45)
    })
})