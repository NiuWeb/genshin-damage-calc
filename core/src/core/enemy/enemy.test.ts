import { aura, stat } from "@core/stats"
import { EnemyConnector } from "./connector"
import { Enemy } from "./enemy"

describe("Enemy auras", () => {
    test("Check affected by an applied aura", () => {
        const enemy = new Enemy()

        enemy.SetAuras(aura.FROZEN, aura.QUICKEN)

        expect(enemy.Affected(stat.CRYO_DMG)).toBe(true)
        expect(enemy.Affected(stat.DENDRO_DMG)).toBe(true)
    })
})

describe("Enemy connector", () => {
    test("Enemy levels are connected", () => {
        const a = new Enemy()
        const b = new Enemy()
        const c = new Enemy()
    
        new EnemyConnector(a, b, c)
        a.SetLevel(77)
        expect(b.GetLevel()).toBe(77)
        expect(c.GetLevel()).toBe(77)
    })

    test("Enemy auras are connected", () => {
        const a = new Enemy()
        const b = new Enemy()
        const c = new Enemy()
    
        new EnemyConnector(a, b, c)
        c.SetAuras(aura.FROZEN, aura.DENDRO)
        expect(new Set(a.GetAuras())).toEqual(new Set([aura.FROZEN, aura.DENDRO]))
        expect(new Set(b.GetAuras())).toEqual(new Set([aura.FROZEN, aura.DENDRO]))
    })
    test("Stats of enemies added later are changed to match the group", () => {
        const a = new Enemy()
        const b = new Enemy()
        const c = new Enemy()
    
        const con  = new EnemyConnector()
        con.Add(a)
        a.SetLevel(77)

        con.Add(b)
        con.Add(c)

        expect(b.GetLevel()).toBe(77)
        expect(c.GetLevel()).toBe(77)
    })

    test("Enemies can be disconnectedd", () => {
        const a = new Enemy()
        const b = new Enemy()
        const c = new Enemy()
    
        const connection = new EnemyConnector(a, b, c)
        a.SetLevel(77)
        expect(b.GetLevel()).toBe(77)
        expect(c.GetLevel()).toBe(77)

        connection.Remove(a)
        a.SetLevel(54)

        expect(b.GetLevel()).toBe(77)
        expect(c.GetLevel()).toBe(77)
    })
})