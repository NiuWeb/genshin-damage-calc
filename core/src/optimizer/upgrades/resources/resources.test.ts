import { ResourceCmd } from "./cmd"

test("Resources cmd loads the domains correctly", () => {
    const cmd = new ResourceCmd()
    cmd.Program.CompileString(`
        domain mora_ley_line
        cost 20
        resource mora 60000

        domain exp_ley_line
        cost 20
        resource exp 122500
        resource mora 1000
    `)()

    const domains = cmd.GetDomains()
    expect(Object.keys(domains)).toHaveLength(2)
    expect(domains["mora_ley_line"]).toBeDefined()
    expect(domains["exp_ley_line"]).toBeDefined()

    expect(domains["mora_ley_line"].cost).toBe(20)
    expect(domains["mora_ley_line"].mora).toBe(60000)

    expect(domains["exp_ley_line"].cost).toBe(20)
    expect(domains["exp_ley_line"].exp).toBe(122500)
    expect(domains["exp_ley_line"].mora).toBe(1000)

    const resources = cmd.GetResources()
    expect(resources).toHaveLength(3)
    expect(resources).toContain("cost")
    expect(resources).toContain("mora")
    expect(resources).toContain("exp")
})

test("Resources cmd loads the upgrades correctly", () => {

    const cmd = new ResourceCmd()
    cmd.Program.CompileString(`
        upgrade only_for_5_star
        resource mora 40000

        stars 4 5
        upgrade for_4_and_5_star
        resource mora 50000

        stars 3 4 5
        upgrade for_3_4_and_5_star
        resource mora 60000

        stars 4
        upgrade for_4_star
        resource mora 70000

        stars 5
        upgrade for_5_star
        resource mora 80000
    `)()

    const stars = cmd.GetStars()
    expect(stars).toHaveLength(3)
    expect(stars).toContain(3)
    expect(stars).toContain(4)
    expect(stars).toContain(5)

    const s3 = cmd.GetUpgrades(3)
    expect(Object.keys(s3)).toHaveLength(1)
    expect(s3["for_3_4_and_5_star"]).toBeDefined()
    expect(s3["for_3_4_and_5_star"].mora).toBe(60000)

    const s4 = cmd.GetUpgrades(4)
    expect(Object.keys(s4)).toHaveLength(3)
    expect(s4["for_3_4_and_5_star"]).toBeDefined()
    expect(s4["for_3_4_and_5_star"].mora).toBe(60000)
    expect(s4["for_4_and_5_star"]).toBeDefined()
    expect(s4["for_4_and_5_star"].mora).toBe(50000)
    expect(s4["for_4_star"]).toBeDefined()
    expect(s4["for_4_star"].mora).toBe(70000)

    const s5 = cmd.GetUpgrades(5)
    expect(Object.keys(s5)).toHaveLength(4)
    expect(s5["for_3_4_and_5_star"]).toBeDefined()
    expect(s5["for_3_4_and_5_star"].mora).toBe(60000)
    expect(s5["for_4_and_5_star"]).toBeDefined()
    expect(s5["for_4_and_5_star"].mora).toBe(50000)
    expect(s5["for_5_star"]).toBeDefined()
    expect(s5["for_5_star"].mora).toBe(80000)
    expect(s5["only_for_5_star"]).toBeDefined()
    expect(s5["only_for_5_star"].mora).toBe(40000)
})