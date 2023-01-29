import { artbox, stats } from "@src/core"
import { sets } from "@src/resources"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"
import { cmd_artifacts_rolls } from "./artifacts_rolls"

export const cmd_artifacts = RunnerCmd(() => ({
    "list": {
        description: "Lists the registered artifact sets",
        arguments: [],
        compile({ Log }) {
            const table = new strings.Table(strings.labels.SET, strings.labels.STARS)
            const list = sets.GetList()
            list.forEach(set => table.AddRow(set.Name, set.Stars))
            return function artifact_list() {
                Log.Logf("Total artifact sets: %d", list.length)
                Log.Log("\n" + table.String())
            }
        }
    },
    "add": {
        description: "Adds a build of 5 artifacts to the current character",
        arguments: [],
        compile({ Value, Log }) {
            return function artifact_add() {
                const char = Value.GetChar()
                if (!char.GetArtifacts()) {
                    char.SetArtifacts(new artbox.Artbox(char))
                    Log.Log("Artifacts created")
                } else {
                    Log.Warn("Artifacts not created. Character already has artifacts")
                }
            }
        }
    },
    "fill": {
        description: "Adds 4 empty substats to all artifacts in the current character",
        arguments: [],
        compile({ Value, Log }) {
            return function artifact_fill() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Character has no artifacts")
                } else {
                    arts.GetArtifacts().forEach(a => a.FillSubstats())
                    Log.Log("All artifacts filled")
                }
            }
        }
    },
    "main": {
        description: "Sets the mainstats of the character artifacts.",
        example: "artifact main atk_percent pyro_dmg crit_rate",
        arguments: ["sands", "goblet", "circlet"],
        compile({ Value, Log }, [_sands, _goblet, _circlet]) {
            const sands = stats.stat.Get(_sands.toUpperCase())
            const goblet = stats.stat.Get(_goblet.toUpperCase())
            const circlet = stats.stat.Get(_circlet.toUpperCase())

            return function artifact_main() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                arts.Get(2).SetMainstat(sands)
                arts.Get(3).SetMainstat(goblet)
                arts.Get(4).SetMainstat(circlet)

                const mains = arts.GetArtifacts().map(art => stats.stat.Name(art.GetMainstat()))
                Log.Logf("Artifact mainstats set to %s", mains.join(", "))
            }
        }
    },
    "level": {
        description: "Sets the level of all the artifacts of the current character.",
        example: "artifact level 20",
        arguments: ["level"],
        compile({ Value, Log }, [strval]) {
            const level = toNumber(strval)
            return function artifact_level() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                arts.GetArtifacts().forEach(art => art.SetLevel(level))
                const values = arts.GetArtifacts().map(art => art.GetLevel())
                Log.Logf("Artifact levels set to %s", values.join(", "))
            }
        }
    },
    "stars": {
        description: "Sets the stars of all the artifacts of the current character.",
        example: "artifact stars 5",
        arguments: ["stars"],
        compile({ Value, Log }, [strval]) {
            const stars = toNumber(strval)
            return function artifact_stars() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                arts.GetArtifacts().forEach(art => art.SetStars(stars))
                const values = arts.GetArtifacts().map(art => art.GetStars())
                Log.Logf("Artifact stars set to %s", values.join(", "))
            }
        }
    },
    "remove": {
        description: "Removes all artifacts from the current character",
        arguments: [],
        compile({ Value, Log }) {
            return function artifact_remove() {
                const char = Value.GetChar()
                char.SetArtifacts(undefined)
                Log.Log("Artifacts removed")
            }
        }
    },
    "show": {
        description: "Shows the artifacts of the current character",
        arguments: [],
        compile({ Value, Log }) {
            return function artifact_show() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                Log.Log("\n" + strings.Artifact(...arts.GetArtifacts()))
            }
        }
    },
    "rolls": {
        description: "Control the artifact rolls in the current character",
        children: cmd_artifacts_rolls(),
    },
    "sets": {
        description:
            "Changes the artifact sets. Arguments in one of the following forms:\n" +
            "- `artifact sets [name]`: 2-piece effect of the given set\n" +
            "- `artifact sets [nameA] [nameB]`: 2-piece effect of the given sets, " +
            "or the 4-piece effect if they're both the same.\n" +
            "- `artifact sets [name] [# of pieces]`: the given set with 2-piece or 4-piece effects.\n\n" +
            "run without arguments to remove all the sets.",
        example:
            "artifact sets CrimsonWitchOfFlames 4 // 4-piece set\n" +
            "artifact sets CrimsonWitchOfFlames WanderersTroupe // 2 + 2 piece set",

        compile({ Value, Log }, args) {
            if (args.length === 0) {
                return function artifact_sets_clear() {
                    const char = Value.GetChar()
                    const arts = char.GetArtifacts()
                    if (!arts) {
                        throw Log.Throw("Current character has no artifacts")
                    }

                    arts.GetArtifacts().forEach(art => art.SetSet(undefined))
                    Log.Log("Removed all artifact sets")
                }
            }
            if (args.length === 1) {
                args.push("2")
            }
            let firstName: string | undefined = undefined
            let secondName: string | undefined = undefined
            const first = sets.FindByName(args[0])
            if (!first) {
                throw Log.Throwf("Set %s not found", args[0])
            }
            firstName = first.Name
            if (args[1] === "2") {
                secondName = undefined
            } else if (args[1] === "4") {
                secondName = firstName
            } else {
                const second = sets.FindByName(args[1])
                if (!second) {
                    throw Log.Throwf("Set %s not found", args[1])
                }
                secondName = second.Name
            }

            return function artifact_sets() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    throw Log.Throw("Current character has no artifacts")
                }
                arts.Get(0).SetSet(firstName)
                arts.Get(1).SetSet(firstName)
                arts.Get(2).SetSet(secondName)
                arts.Get(3).SetSet(secondName)
                Log.Logf("Artifact sets set to %s", arts.GetActiveSets().join(", "))
            }
        }
    }
}))