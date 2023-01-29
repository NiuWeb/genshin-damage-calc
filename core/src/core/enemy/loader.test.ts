import { aura, stat } from "@core/stats"
import { Enemy } from "./enemy"
import { Import, Export } from "./loader"

describe("Binary enemy loader", () => {
    test("Encode and decode", () => {
        const enemy = new Enemy()
        enemy.SetLevel(33)
        enemy.SetAuras(aura.FROZEN, aura.QUICKEN)
        enemy.SetBaseRes(stat.CRYO_RES, 0.35)

        const data = Export(enemy)

        const copy = new Enemy()
        Import(data, copy)

        expect(copy.GetLevel()).toBe(enemy.GetLevel())
        expect(new Set(copy.GetAuras())).toEqual(new Set(enemy.GetAuras()))
        expect(copy.GetBaseRes(stat.CRYO_RES)).toBe(enemy.GetBaseRes(stat.CRYO_RES))
    })
})