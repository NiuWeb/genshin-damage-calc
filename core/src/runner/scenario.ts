import { charbox, effect, rotation, stats } from "@src/core"
import { scenarioConfig } from "./config"
import { Compiler, Dictionary } from "@bygdle/cmdlang"

/** Runner scenario */
export class Scenario {
    private compiler?: Compiler<Scenario, void>

    State?: charbox.ExportedParty
    Party = new charbox.Party()
    Rotation = new rotation.Rotation()
    Character: charbox.Charbox | undefined
    Effect: effect.Effect | undefined

    Config = scenarioConfig()

    public Variables: Dictionary<number> = {}
    /**
     * A proxy for the scenario variables that will
     * be used by the compiler
     */
    readonly VarProxy = new Proxy<Dictionary<number>>({}, {
        get: (_, _prop) => {
            const prop = _prop.toString()
            const parts = prop.split("_")

            // variables in the form `characterName_stat` will be
            // reserved, replaced by the character stat at runtime.
            if (parts.length > 1) {
                const name = parts.shift() || ""
                const statName = parts.join("_").toUpperCase()

                const stat = stats.stat.Get(statName)

                const member = this.Party.FindMember(name)
                if (member) {
                    return member.GetCharacter().Get(stat)
                }
            }


            return this.Variables[prop]
        },
        set: (_, _prop, value) => {
            const prop = _prop.toString()
            const parts = prop.split("_")
            
            // variables in the form `characterName_stat` will be
            // reserved, replaced by the character stat at runtime.
            // So they cannot be set.
            if (parts.length > 1) {
                const name = parts.shift() || ""

                const member = this.Party.FindMember(name)
                if (member) {
                    throw new Error(`Cannot set variable ${prop}: reserved for character stats`)
                }
            }

            this.Variables[prop] = value
            return true
        }
    })

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

    /** Sets the scenario compiler */
    SetCompiler(compiler: Compiler<Scenario, void>): void {
        this.compiler = compiler
    }

    /** Gets the scenario compiler */
    GetCompiler(): Compiler<Scenario, void> {
        if (!this.compiler) {
            throw new Error("Scenario compiler not set")
        }
        return this.compiler
    }
}