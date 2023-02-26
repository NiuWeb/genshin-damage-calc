import { Exported as ExportedCharacter, Export as ExportCharacter, Import as ImportCharacter } from "@core/character"
import { Exported as ExportedWeapon, Export as ExportWeapon, Import as ImportWeapon } from "@core/weapon"
import { Exported as ExportedEffect, Export as ExportEffect, Import as ImportEffect } from "@core/effect"
import { Exported as ExportedArtifact, Export as ExportArtifact, Import as ImportArtifact } from "@core/artifact"
import type { Charbox } from "./charbox"
import type { Party } from "./party"
import { piece } from "@core/stats"
import { FindByName as FindFoodByName } from "@src/resources/foods"

/** An exported charbox */
export interface Exported {
    /** character data */
    character: ExportedCharacter
    /** weapon data */
    weapon: {
        [name: string]: ExportedWeapon
    }
    /** effects data */
    effects: {
        [name: string]: ExportedEffect
    }
    /** artifacts data */
    artifacts: {
        [piece: number]: ExportedArtifact
    }
    /** custom modifiers */
    modifiers: { stat: number, value: number }[]
}
/** Exports a character box's data */
export function Export(box: Charbox): Exported {
    const weapon: Exported["weapon"] = {}
    const effects: Exported["effects"] = {}
    const artifacts: Exported["artifacts"] = {}
    for (const ef of box.GetEffects()) {
        effects[ef.Options.Name] = ExportEffect(ef)
    }
    const wp = box.GetWeapon()
    if (wp) {
        weapon[wp.Options.Name] = ExportWeapon(wp)
    }
    const arts = box.GetArtifacts()
    if (arts) {
        piece.Values().forEach(piece => (
            artifacts[piece] = ExportArtifact(arts.Get(piece))
        ))
    }
    const modifiers = box
        .GetModifiers()
        .map((mod) => ({
            stat: mod.GetProp(),
            value: mod.GetValue()
        }))
    return {
        character: ExportCharacter(box.GetCharacter()),
        weapon,
        effects,
        artifacts,
        modifiers,
    }
}

/** Imports character box's data */
export function Import(data: Exported, box: Charbox): void {
    const weapon = box.GetWeapon()
    if (weapon) {
        const dat = data.weapon[weapon.Options.Name]
        if (dat) {
            ImportWeapon(dat, weapon)
        }
    }
    const arts = box.GetArtifacts()
    if (arts) {
        piece.Values().forEach(piece => {
            const dat = data.artifacts[piece]
            if (dat) {
                ImportArtifact(dat, arts.Get(piece))
            }
        })
    }
    for (const ef of box.GetEffects()) {
        const dat = data.effects[ef.Options.Name]
        if (!dat) continue
        ImportEffect(dat, ef)
    }
    box.ClearModifiers()
    for (const { stat, value } of data.modifiers) {
        box.AddModifier(box.GetCharacter().CreateModifier(stat, value))
    }
    ImportCharacter(data.character, box.GetCharacter())
}


/** Data for exported party */
export interface ExportedParty {
    /** characters data */
    characters: {
        [name: string]: Exported
    }
    /** resonance effects data */
    resonances: {
        [name: string]: ExportedEffect
    }
    /** effect targets data */
    targets: {
        [characterName: string]: {
            /** name of targets for each effect */
            [effectName: string]: string[]
        }
    }
    /** food data */
    foods?: [name: string, rank: number][]
}

/** Exports data of a party */
export function ExportParty(party: Party): ExportedParty {
    const characters: ExportedParty["characters"] = {}
    for (const member of party.GetMembers()) {
        characters[member.GetCharacter().Options.Name] = Export(member)
    }
    const resonances: ExportedParty["resonances"] = {}
    for (const ef of party.GetResonances()) {
        resonances[ef.Options.Name] = ExportEffect(ef)
    }
    const targets: ExportedParty["targets"] = {}
    for (const ef of party.GetAllEffects()) {
        const owner = ef.Owner.GetCharacter().Options.Name
        if (!targets[owner]) targets[owner] = {}
        targets[owner][ef.Options.Name] = ef.GetTargets().map(c => c.GetCharacter().Options.Name)
    }
    // save foods
    const foods = party.GetFoods().GetAll().map(f => [f.Name, f.GetRank()] as [string, number])

    return { characters, resonances, targets, foods }
}

/** Exports data from a party */
export function ImportParty(data: ExportedParty, party: Party): void {
    const members = party.GetMembers()
    for (const member of members) {
        const dat = data.characters[member.GetCharacter().Options.Name]
        if (dat) {
            Import(dat, member)
        }
    }
    for (const ef of party.GetResonances()) {
        const dat = data.resonances[ef.Options.Name]
        if (dat) {
            ImportEffect(dat, ef)
        }
    }

    for (const ef of party.GetAllEffects()) {
        const ownerName = ef.Owner.GetCharacter().Options.Name
        const effectName = ef.Options.Name

        const targetsData = data.targets[ownerName]
        if (!targetsData) { continue }

        const targetNames = targetsData[effectName]
        if (!targetNames) { continue }

        const targets: Charbox[] = []
        for (const member of members) {
            if (targetNames.includes(member.GetCharacter().Options.Name)) {
                targets.push(member)
            }
        }

        ef.ApplyMultiple(targets)
    }

    // load foods
    party.GetFoods().Clear()
    if (data.foods) for (const [name, rank] of data.foods) {
        const gen = FindFoodByName(name)
        if (!gen) continue
        const food = party.GetFoods().Add(gen)
        food.SetRank(rank)
    }
}