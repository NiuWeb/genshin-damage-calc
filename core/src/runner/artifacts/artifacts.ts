import { artbox, stats } from "@src/core"
import { sets } from "@src/resources"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"
import { cmd_artifacts_rolls } from "./artifacts_rolls"

export const cmd_artifacts = RunnerCmd(() => ({
    "list": {
        name: "list",
        description: "Lists the registered artifact sets",
        compile(_, { logger }) {
            const table = new strings.Table(strings.labels.SET, strings.labels.STARS)
            const list = sets.GetList()
            list.forEach(set => table.AddRow(set.Name, set.Stars))
            return function artifact_list() {
                logger.logf("Total artifact sets: %d", list.length)
                logger.log("\n" + table.String())
            }
        }
    },
    "add": {
        name: "add",
        description: "Adds a build of 5 artifacts to the current character",
        compile(_, { context, logger }) {
            return function artifact_add() {
                const char = context.GetChar()
                if (!char.GetArtifacts()) {
                    char.SetArtifacts(new artbox.Artbox(char))
                    logger.log("Artifacts created")
                } else {
                    logger.warn("Artifacts not created. Character already has artifacts")
                }
            }
        }
    },
    "fill": {
        name: "fill",
        description: "Adds 4 empty substats to all artifacts in the current character",
        compile(_, { context, logger }) {
            return function artifact_fill() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Character has no artifacts")
                } else {
                    arts.GetArtifacts().forEach(a => a.FillSubstats())
                    logger.log("All artifacts filled")
                }
            }
        }
    },
    "main": {
        name: "main",
        description: "Sets the mainstats of the character artifacts.",
        arguments: "sands goblet circlet",
        example: "artifact main atk_percent pyro_dmg crit_rate",
        compile({ values: [_sands, _goblet, _circlet] }, { context, logger },) {
            const sands = stats.stat.Get(_sands.toUpperCase())
            const goblet = stats.stat.Get(_goblet.toUpperCase())
            const circlet = stats.stat.Get(_circlet.toUpperCase())

            return function artifact_main() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                arts.Get(2).SetMainstat(sands)
                arts.Get(3).SetMainstat(goblet)
                arts.Get(4).SetMainstat(circlet)

                const mains = arts
                    .GetArtifacts()
                    .map(art => stats.stat.Name(art.GetMainstat()))

                logger.logf("Artifact mainstats set to %s", mains.join(", "))
            }
        }
    },
    "level": {
        name: "level",
        description: "Sets the level of all the artifacts of the current character.",
        example: "artifact level 20",
        arguments: "level",
        compile({ values: [strval] }, { context, logger }) {
            const level = toNumber(strval)
            return function artifact_level() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                arts.GetArtifacts().forEach(art => art.SetLevel(level))
                const values = arts.GetArtifacts().map(art => art.GetLevel())
                logger.logf("Artifact levels set to %s", values.join(", "))
            }
        }
    },
    "stars": {
        name: "stars",
        description: "Sets the stars of all the artifacts of the current character.",
        example: "artifact stars 5",
        arguments: "stars",
        compile({ values: [strval] }, { context, logger }) {
            const stars = toNumber(strval)
            return function artifact_stars() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                arts.GetArtifacts().forEach(art => art.SetStars(stars))
                const values = arts.GetArtifacts().map(art => art.GetStars())
                logger.logf("Artifact stars set to %s", values.join(", "))
            }
        }
    },
    "remove": {
        name: "remove",
        description: "Removes all artifacts from the current character",
        compile(_, { context, logger }) {
            return function artifact_remove() {
                const char = context.GetChar()
                char.SetArtifacts(undefined)
                logger.log("Artifacts removed")
            }
        }
    },
    "show": {
        name: "show",
        description: "Shows the artifacts of the current character",
        compile(_, { context, logger }) {
            return function artifact_show() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                logger.log("\n" + strings.Artifact(...arts.GetArtifacts()))
            }
        }
    },
    "rolls": {
        name: "rolls",
        description: "Control the artifact rolls in the current character",
        children: cmd_artifacts_rolls(),
    },
    "sets": {
        name: "sets",
        arguments: "firstName [otherNameOrPieces]",
        docs: {
            firstName: "the name of the first set",
            otherNameOrPieces: "the name of the second set, or the number of pieces of the first set (2 or 4)"
        },
        description:
            "Changes the artifact sets. Arguments in one of the following forms:\n" +
            "- `artifact sets [firstName]`: 2-piece effect of the given set\n" +
            "- `artifact sets [firstName] [otherName]`: 2-piece effect of the given sets, " +
            "or the 4-piece effect if they're both the same.\n" +
            "- `artifact sets [firstName] [Pieces]`: the given set with 2-piece or 4-piece effects.\n\n" +
            "run without arguments to remove all the sets.",
        example:
            "artifact sets CrimsonWitchOfFlames 4 // 4-piece set\n" +
            "artifact sets CrimsonWitchOfFlames WanderersTroupe // 2 + 2 piece set",

        compile({ values }, { context, logger }) {
            if (values.length === 0) {
                return function artifact_sets_clear() {
                    const char = context.GetChar()
                    const arts = char.GetArtifacts()
                    if (!arts) {
                        throw new Error("Current character has no artifacts")
                    }

                    arts.GetArtifacts().forEach(art => art.SetSet(undefined))
                    logger.log("Removed all artifact sets")
                }
            }
            if (values.length === 1) {
                values.push("2")
            }
            let firstName: string | undefined = undefined
            let secondName: string | undefined = undefined
            const first = sets.FindByName(values[0])
            if (!first) {
                throw new Error("Set " + values[0] + " not found")
            }
            firstName = first.Name
            if (values[1] === "2") {
                secondName = undefined
            } else if (values[1] === "4") {
                secondName = firstName
            } else {
                const second = sets.FindByName(values[1])
                if (!second) {
                    throw new Error("Set " + values[1] + " not found")
                }
                secondName = second.Name
            }

            return function artifact_sets() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    throw new Error("Current character has no artifacts")
                }
                arts.Get(0).SetSet(firstName)
                arts.Get(1).SetSet(firstName)
                arts.Get(2).SetSet(secondName)
                arts.Get(3).SetSet(secondName)
                logger.logf("Artifact sets set to %s", arts.GetActiveSets().join(", "))
            }
        }
    }
}))