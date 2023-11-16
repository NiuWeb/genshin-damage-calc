import { artifact, stats } from "@src/core"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_pieces = RunnerCmd(() => {
    const cmd: ReturnType<ReturnType<typeof RunnerCmd>> = {}
    stats.piece.Values().forEach(piece => {
        const name = stats.piece.Name(piece).toLowerCase()
        cmd[name] = {
            name,
            description: "Controls the artifact " + stats.piece.Name(piece),
            children: cmd_piece(piece)(),
        }
    })
    return cmd
})

const cmd_piece = (piece: number) => RunnerCmd(() => ({
    "main": {
        name: "main",
        description:
            "Sets the mainstat of the " + stats.piece.Name(piece),
        example:
            stats.piece.Name(piece).toLowerCase() + " main " +
            stats.stat.Name(stats.PieceToMainstats(piece)[0]),
        arguments: "mainstat",

        compile({ values: [mainstat] }, { context: context, logger }) {
            const stat = stats.stat.Get(mainstat.toUpperCase())
            return function piece_main() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                arts.Get(piece).SetMainstat(stat)
                logger.logf("%s mainstat set to %s", stats.piece.Name(piece), arts.Get(piece).GetMainstat())
            }
        }
    },
    "set": {
        name: "set",
        description: "Sets the set name of the " + stats.piece.Name(piece),
        example: stats.piece.Name(piece).toLowerCase() + " set WanderersTroupe",
        arguments: "set",
        compile({ values: [set] }, { context, logger }) {
            return function piece_set() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                arts.Get(piece).SetSet(set)
                logger.logf("%s set changed to %s", stats.piece.Name(piece), arts.Get(piece).GetSet())
            }
        }
    },
    "level": {
        name: "level",
        description: "Sets the level of the " + stats.piece.Name(piece),
        example: stats.piece.Name(piece).toLowerCase() + " level 16",
        arguments: "level",
        compile({ values: [strval] }, { context, logger }) {
            const level = toNumber(strval)
            return function piece_level() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                arts.Get(piece).SetLevel(level)
                logger.logf("%s level set to %d", stats.piece.Name(piece), arts.Get(piece).GetLevel())
            }
        }
    },
    "stars": {
        name: "stars",
        description: "Sets the stars of the " + stats.piece.Name(piece),
        example: stats.piece.Name(piece).toLowerCase() + " stars 4",
        arguments: "stars",
        compile({ values: [strval] }, { context: Value, logger }) {
            const stars = toNumber(strval)
            return function piece_stars() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                arts.Get(piece).SetStars(stars)
                logger.logf("%s stars set to %d", stats.piece.Name(piece), arts.Get(piece).GetStars())
            }
        }
    },
    "show": {
        name: "show",
        description: "Shows the " + stats.piece.Name(piece),
        compile(_, { context, logger }) {
            return function piece_show() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                logger.log("\n" + strings.Artifact(arts.Get(piece)))
            }
        }
    },
    "rolls": {
        name: "rolls",
        description: "Shows the rolls of the " + stats.piece.Name(piece),
        compile(_, { context, logger }) {
            return function piece_rolls() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                const art = arts.Get(piece)
                logger.log(strings.ArtifactRolls(art))
            }
        }
    },
    "sub": {
        name: "sub",
        description: "Control the substats of the " + stats.piece.Name(piece),
        children: {
            "clear": {
                name: "clear",
                description: "Set all substats to 0",
                compile(_, { context, logger }) {
                    return function piece_sub_clear() {
                        const char = context.GetChar()
                        const arts = char.GetArtifacts()
                        if (!arts) {
                            logger.error("Current character has no artifacts")
                            return
                        }
                        arts.Get(piece).ClearSubstats()
                        logger.log("Substats cleared")
                    }
                }
            },
            "add": {
                name: "add",
                description: "Adds a new substat to the artifact.",
                example: stats.piece.Name(piece).toLowerCase() + " sub add crit_rate 7.8%",
                arguments: "stat value",
                compile({ values: [_stat, _value] }, { context, logger }) {
                    const stat = stats.stat.Get(_stat.toUpperCase())
                    const value = toNumber(_value)
                    return function piece_sub_add() {
                        const char = context.GetChar()
                        const arts = char.GetArtifacts()
                        if (!arts) {
                            logger.error("Current character has no artifacts")
                            return
                        }
                        const art = arts.Get(piece)
                        if (art.AddSubstat(stat, value)) {
                            logger.log("Substat added")
                        } else {
                            logger.warn("Substat not added")
                        }
                    }
                }
            },
            "set": {
                name: "set",
                description: "Changes a substat. Substat index starts from zero.",
                example: stats.piece.Name(piece).toLowerCase() + " sub set 2 crit_rate 7.8%",
                arguments: "index stat value",
                compile({ values: [_index, _stat, _value] }, { context, logger },) {
                    const index = toNumber(_index)
                    const stat = stats.stat.Get(_stat.toUpperCase())
                    const value = toNumber(_value)
                    return function piece_sub_set() {
                        const char = context.GetChar()
                        const arts = char.GetArtifacts()
                        if (!arts) {
                            logger.error("Current character has no artifacts")
                            return
                        }
                        const art = arts.Get(piece)
                        if (index >= art.SubstatsLength()) {
                            logger.errorf("Substat index out of range [0-%d]", art.SubstatsLength() - 1)
                            return
                        }
                        art.SetSubstat(index, stat)
                        art.SetSubstatValue(index, value)
                        logger.logf("Substat %d changed", index)
                    }
                }
            }
        }
    },
    "downgrade": {
        name: "downgrade",
        description: "Converts a 5-star artifact to a 4-star artifact, reducing the value of substats.",
        compile(_, { context, logger }) {
            return function piece_downgrade() {
                const char = context.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    logger.error("Current character has no artifacts")
                    return
                }
                const art = arts.Get(piece)
                artifact.transform.Downgrade(art)
                logger.log("Artifact downgraded")
            }
        }
    }
}))