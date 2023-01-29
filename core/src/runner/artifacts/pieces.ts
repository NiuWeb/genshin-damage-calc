import { artifact, stats } from "@src/core"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_pieces = RunnerCmd(() => {
    const cmd: ReturnType<ReturnType<typeof RunnerCmd>> = {}
    stats.piece.Values().forEach(piece => (
        cmd[stats.piece.Name(piece).toLowerCase()] = {
            description: "Controls the artifact " + stats.piece.Name(piece),
            children: cmd_piece(piece)(),
        }
    ))
    return cmd
})

const cmd_piece = (piece: number) => RunnerCmd(() => ({
    "main": {
        description:
            "Sets the mainstat of the " + stats.piece.Name(piece),
        example:
            stats.piece.Name(piece).toLowerCase() + " main " +
            stats.stat.Name(stats.PieceToMainstats(piece)[0]),
        arguments: ["mainstat"],

        compile({ Value, Log }, [mainstat]) {
            const stat = stats.stat.Get(mainstat.toUpperCase())
            return function piece_main() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                arts.Get(piece).SetMainstat(stat)
                Log.Logf("%s mainstat set to %s", stats.piece.Name(piece), arts.Get(piece).GetMainstat())
            }
        }
    },
    "set": {
        description: "Sets the set name of the " + stats.piece.Name(piece),
        example: stats.piece.Name(piece).toLowerCase() + " set WanderersTroupe",
        arguments: ["set"],
        compile({ Value, Log }, [set]) {
            return function piece_set() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                arts.Get(piece).SetSet(set)
                Log.Logf("%s set changed to %s", stats.piece.Name(piece), arts.Get(piece).GetSet())
            }
        }
    },
    "level": {
        description: "Sets the level of the " + stats.piece.Name(piece),
        example: stats.piece.Name(piece).toLowerCase() + " level 16",
        arguments: ["level"],
        compile({ Value, Log }, [strval]) {
            const level = toNumber(strval)
            return function piece_level() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                arts.Get(piece).SetLevel(level)
                Log.Logf("%s level set to %d", stats.piece.Name(piece), arts.Get(piece).GetLevel())
            }
        }
    },
    "stars": {
        description: "Sets the stars of the " + stats.piece.Name(piece),
        example: stats.piece.Name(piece).toLowerCase() + " stars 4",
        arguments: ["stars"],
        compile({ Value, Log }, [strval]) {
            const stars = toNumber(strval)
            return function piece_stars() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                arts.Get(piece).SetStars(stars)
                Log.Logf("%s stars set to %d", stats.piece.Name(piece), arts.Get(piece).GetStars())
            }
        }
    },
    "show": {
        description: "Shows the " + stats.piece.Name(piece),
        arguments: [],
        compile({ Value, Log }) {
            return function piece_show() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                Log.Log("\n" + strings.Artifact(arts.Get(piece)))
            }
        }
    },
    "rolls": {
        description: "Shows the rolls of the " + stats.piece.Name(piece),
        arguments: [],
        compile({ Value, Log }) {
            return function piece_rolls() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                const art = arts.Get(piece)
                Log.Log(strings.ArtifactRolls(art))
            }
        }
    },
    "sub": {
        description: "Control the substats of the " + stats.piece.Name(piece),
        children: {
            "clear": {
                description: "Set all substats to 0",
                arguments: [],
                compile({ Value, Log }) {
                    return function piece_sub_clear() {
                        const char = Value.GetChar()
                        const arts = char.GetArtifacts()
                        if (!arts) {
                            Log.Error("Current character has no artifacts")
                            return
                        }
                        arts.Get(piece).ClearSubstats()
                        Log.Log("Substats cleared")
                    }
                }
            },
            "add": {
                description: "Adds a new substat to the artifact.",
                example: stats.piece.Name(piece).toLowerCase() + " sub add crit_rate 7.8%",
                arguments: ["stat", "value"],
                compile({ Value, Log }, [_stat, _value]) {
                    const stat = stats.stat.Get(_stat.toUpperCase())
                    const value = toNumber(_value)
                    return function piece_sub_add() {
                        const char = Value.GetChar()
                        const arts = char.GetArtifacts()
                        if (!arts) {
                            Log.Error("Current character has no artifacts")
                            return
                        }
                        const art = arts.Get(piece)
                        if (art.AddSubstat(stat, value)) {
                            Log.Log("Substat added")
                        } else {
                            Log.Warn("Substat not added")
                        }
                    }
                }
            },
            "set": {
                description: "Changes a substat. Substat index starts from zero.",
                example: stats.piece.Name(piece).toLowerCase() + " sub set 2 crit_rate 7.8%",
                arguments: ["index", "stat", "value"],
                compile({ Value, Log }, [_index, _stat, _value]) {
                    const index = toNumber(_index)
                    const stat = stats.stat.Get(_stat.toUpperCase())
                    const value = toNumber(_value)
                    return function piece_sub_set() {
                        const char = Value.GetChar()
                        const arts = char.GetArtifacts()
                        if (!arts) {
                            Log.Error("Current character has no artifacts")
                            return
                        }
                        const art = arts.Get(piece)
                        if (index >= art.SubstatsLength()) {
                            Log.Errorf("Substat index out of range [0-%d]", art.SubstatsLength() - 1)
                            return
                        }
                        art.SetSubstat(index, stat)
                        art.SetSubstatValue(index, value)
                        Log.Logf("Substat %d changed", index)
                    }
                }
            }
        }
    },
    "downgrade": {
        description: "Converts a 5-star artifact to a 4-star artifact, reducing the value of substats.",
        arguments: [],
        compile({ Value, Log }) {
            return function piece_downgrade() {
                const char = Value.GetChar()
                const arts = char.GetArtifacts()
                if (!arts) {
                    Log.Error("Current character has no artifacts")
                    return
                }
                const art = arts.Get(piece)
                artifact.transform.Downgrade(art)
                Log.Log("Artifact downgraded")
            }
        }
    }
}))