import { equipCombinationCmd } from "./equip"

describe("Create commands to equip by combination", () => {
    const cmd = equipCombinationCmd({
        weapon: {
            name: "engulfinglightning",
            rank: 1,
            condition: ["cast_q"]
        },
        artifact: {
            sands: 3,
            goblet: 4,
            circlet: 5,
            set: ["noblesseoblige", "noblesseoblige"],
            target: ["HuTao"]
        }
    })

    test("weapon effects are configured", () => {
        expect(cmd).toMatch(/effect\s+set\s+engulfinglightning/i)
        expect(cmd).toMatch(/effect\s+condition\s+cast_q/i)
    })

    test("Noblesse4 is configured", () => {
        expect(cmd).toMatch(/effect\s+set\s+noblesseoblige4/i)
    })

    console.log(cmd)
})