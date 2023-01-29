import { charbox, effect, rotation } from "@src/core"
import { scenarioConfig } from "./config"

/** Runner scenario */
export class Scenario {
    State?: charbox.ExportedParty
    Party = new charbox.Party()
    Rotation = new rotation.Rotation()
    Character: charbox.Charbox | undefined
    Effect: effect.Effect | undefined

    Config = scenarioConfig()

    Reset(): void {
        this.Party = new charbox.Party()
        this.Rotation = new rotation.Rotation()
        this.Character = undefined
        this.Effect = undefined
        this.Config = scenarioConfig()
        this.State = undefined
    }

    /** Gets the currently selected effect */
    GetEffect(): effect.Effect {
        if (!this.Effect) {
            throw new Error("Effect not set")
        }
        return this.Effect
    }
    /** Sets the current effect */
    SetEffect(ef: effect.Effect | undefined): void {
        this.Effect = ef
    }

    /** Gets the current character if defined, and throws an error otherwise */
    GetChar(): charbox.Charbox {
        if (!this.Character) {
            throw new Error("Character not set")
        }
        return this.Character
    }
    /** sets the scenario current character */
    SetChar(char: charbox.Charbox | undefined): void {
        if (char && !this.Party.GetMembers().includes(char)) {
            throw new Error("Cannot set scenario character: character not in party")
        }
        this.Character = char
    }
}