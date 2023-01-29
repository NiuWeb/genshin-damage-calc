import { Program } from "@src/cmd2"
import { cmd_artifacts } from "./artifacts/artifacts"
import { cmd_pieces } from "./artifacts/pieces"
import { cmd_character } from "./character/character"
import { cmd_effect } from "./effect/effect"
import { cmd_enemy } from "./enemy/enemy"
import { cmd_enka } from "./enka/enka"
import { cmd_rotation } from "./rotation/rotation"
import { Scenario } from "./scenario"
import { cmd_state } from "./state/state"
import { cmd_weapon } from "./weapon/weapon"

/** creates a genshin command runner */
export class Runner {
    Scenario = new Scenario()
    Program = new Program(this.Scenario)
    /** creates a genshin command runner */
    constructor() {
        this.Program.Set({
            "character": {
                description: "Controls characters in the party",
                children: cmd_character()
            },
            "weapon": {
                description: "Controls weapons in the party",
                children: cmd_weapon()
            },
            "effect": {
                description: "Controls effects in the party",
                children: cmd_effect()
            },
            "artifact": {
                description: "Controls all the artifacts",
                children: cmd_artifacts()
            },
            ...cmd_pieces(),
            "enemy": {
                description: "Controls all enemies in the party.",
                children: cmd_enemy()
            },
            "rotation": {
                description: "Controls the rotation",
                children: cmd_rotation()
            },
            "reset": {
                description: "Resets the scenario to its initial state",
                arguments: [],
                compile({ Value, Log }) {
                    return function reset() {
                        Value.Reset()
                        Log.Warnf("Command `reset` executed.")
                    }
                }
            },
            "state": {
                description: "Functions to save/load the party state",
                children: cmd_state()
            },
            "enka": {
                description: "Imports characters from Enka.Network service",
                children: cmd_enka()
            }
        })
    }

}