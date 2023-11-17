import { charbox, effect, rotation, stats } from "@src/core"
import { scenarioConfig } from "./config"
import { Compiler, Dictionary } from "@bygdle/cmdlang"
import { toNumber } from "@src/utils/conversions"

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
                const member = name === "char" ? this.Character : this.Party.FindMember(name)

                if (member) {
                    const statName = parts.join("_").toUpperCase()

                    switch (statName) {
                        case "MAX_CONSTELLATIONS":
                            // eslint-disable-next-line no-case-declarations
                            let max = 0
                            for (let i = 1; i <= 6; i++) {
                                const ef = member.FindEffect(`${name}C${i}`)
                                if (ef && ef.Enabled()) {
                                    max = i
                                }
                            }
                            return max

                        default:
                            // eslint-disable-next-line no-case-declarations
                            const stat = stats.stat.Get(statName)
                            return member.GetCharacter().Get(stat)
                    }
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

                const member = name === "char" ? this.Character : this.Party.FindMember(name)
                if (member) {
                    const statName = parts.join("_").toUpperCase()
                    const stat = stats.stat.Get(statName)
                    const numval = typeof value === "number" ? value : toNumber(String(value).valueOf())
                    if (!Number.isFinite(numval)) {
                        throw new Error(`Cannot set variable ${prop} to ${value}: value is not a number`)
                    }
                    member.SetStat(stat, numval)
                    this.compiler?.program.logger.logf("Character %s stat %s set to %.4f",
                        member.GetCharacter().Options.Name, stats.stat.Name(stat), numval
                    )
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