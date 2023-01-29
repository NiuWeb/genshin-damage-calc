import { region, stat, weapon } from "@core/stats"
import { Character } from "@core/character"
import { Charbox } from "./charbox"
import { Party } from "./party"

describe("Character and party creation", () => {

    const c1 = new Charbox(new Character({
        Name: "a",
        Stars: 5,
        Element: stat.CRYO_DMG,
        Region: region.NONE,
        Weapon: weapon.POLEARM,
        BurstCost: 60,
    }))
    const c2 = new Charbox(new Character({
        Name: "b",
        Stars: 5,
        Element: stat.PYRO_DMG,
        Region: region.NONE,
        Weapon: weapon.POLEARM,
        BurstCost: 60,
    }))
    const c3 = new Charbox(new Character({
        Name: "c",
        Stars: 5,
        Element: stat.HYDRO_DMG,
        Region: region.NONE,
        Weapon: weapon.POLEARM,
        BurstCost: 60,
    }))
    const c4 = new Charbox(new Character({
        Name: "d",
        Stars: 5,
        Region: region.NONE,
        Element: stat.PYRO_DMG,
        Weapon: weapon.POLEARM,
        BurstCost: 60,
    }))

    const party = new Party(c1, c2, c3, c4)

    test("1 resonance is created", () => {
        expect(party.GetResonances().length).toBe(1)
    })
    test("created resonance is pyro resonance", () => {
        expect(party.GetResonances()[0].Options.Name).toBe("ResonancePyro")
    })
    test("Pryo resonance is enabled in all members", () => {
        expect(c1.GetCharacter().Get(stat.ATK_PERCENT)).toBeCloseTo(0.25, 6)
        expect(c2.GetCharacter().Get(stat.ATK_PERCENT)).toBeCloseTo(0.25, 6)
        expect(c3.GetCharacter().Get(stat.ATK_PERCENT)).toBeCloseTo(0.25, 6)
        expect(c4.GetCharacter().Get(stat.ATK_PERCENT)).toBeCloseTo(0.25, 6)
    })
    test("All members are in the same party", () => {
        expect(c1.GetParty()?.GetMembers().length).toBe(4)
        expect(c2.GetParty()?.GetMembers().length).toBe(4)
        expect(c3.GetParty()?.GetMembers().length).toBe(4)
        expect(c4.GetParty()?.GetMembers().length).toBe(4)
    })
})