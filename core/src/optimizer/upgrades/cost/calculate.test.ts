import { ResourceCmd } from "../resources/cmd"
import { CalculateCost } from "./calculate"

test("Calculate the total cost of getting upgrades", () => {
    const cmd = new ResourceCmd()
    cmd.compileString(`
        domain domain1
        cost 100 
        resource gold 10
        resource silver 20

        domain domain2
        cost 150
        resource silver 10
        resource bronze 40

        domain domain3
        cost 200
        resource gold 20
        resource bronze 30

        upgrade upgrade1
        resource gold 20
        resource silver 30
        resource bronze 50
        
        upgrade upgrade2
        resource gold 20
        resource silver 30
        resource bronze 50
    `)()

    const pool = cmd.GetPool()

    // calculate upgrade1 once
    let result = CalculateCost(pool, 5, "upgrade1")
    expect(result.upgrade1.cost).toBeCloseTo(334, 0)

    // calculate upgrade1 twice
    result = CalculateCost(pool, 5, "upgrade1", "upgrade2")
    expect(result.upgrade2.cost).toBeCloseTo(334, 0)
})