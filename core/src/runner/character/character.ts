import { stats } from "@src/core"
import { characters } from "@src/resources"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"
import { cmd_character_stat } from "./stat"

export const cmd_character = RunnerCmd(() => ({
    "add": {
        description: "Adds a new character.",
        example: "character add hutao",
        arguments: ["name"],
        compile(program, [name]) {
            const { Value, Log } = program
            const generator = characters.FindByName(name)
            if (!generator) {
                throw Log.Throwf("Character not found: %s", name)
            }
            return function character_add() {
                const existing = Value.Party.FindMember(name)
                if (existing) {
                    Log.Errorf("Cannot add character %s because it is already added", generator.Name)
                    return
                }
                const char = generator()
                Value.Party.Add(char)
                Log.Logf("Character %s added to the party", char.GetCharacter().Options.Name)
                program.Compile(["character", "set", generator.Name], { line: Log.Line })()
            }
        }
    },
    "remove": {
        description: "Removes a character from the party",
        example: "character remove Hutao",
        arguments: ["name"],
        compile(program, [name]) {
            const { Value, Log } = program
            return function character_remove() {
                const member = Value.Party.FindMember(name)
                if (!member) {
                    Log.Errorf("Cannot remove character %s because it is not added", name)
                    return
                }
                if (!Value.Party.Remove(member)) {
                    Log.Logf("Cannot remove character %s", member.GetCharacter().Options.Name)
                } else {
                    member.GetEffects().forEach(ef => ef.Disable().UnapplyAll())
                    if (Value.GetChar() === member) {
                        program.Compile(["character", "unset"], { line: Log.Line })()
                    }
                    Log.Logf("Character %s removed", member.GetCharacter().Options.Name)
                }
            }
        }
    },
    "set": {
        description: "Sets the current character",
        example: "character set Hutao",
        arguments: ["name"],
        compile({ Value, Log }, [name]) {
            return function character_set() {
                const member = Value.Party.FindMember(name)
                if (!member) {
                    Log.Errorf("Cannot set character %s because it is not added", name)
                    return
                }
                Value.SetChar(member)
                Log.Logf("Character %s set as current", member.GetCharacter().Options.Name)
            }
        }
    },
    "unset": {
        description: "Unsets the current character",
        arguments: [],
        compile({ Value, Log }) {
            return function character_unset() {
                Value.SetChar(undefined)
                Log.Log("Character unset. There is no current character selected")
            }
        }
    },
    "level": {
        description: "Sets the level of the current character",
        example: "character level 70\ncharacter level 80+ // level 80 ascended",
        arguments: ["level"],
        compile({ Value, Log }, [str]) {
            let strval = str
            const ascend = str.endsWith("+")
            if (ascend) {
                strval = str.slice(0, strval.length - 1)
            }
            const level = toNumber(strval)
            const ascension = ascend ? 6 : 0

            return function character_level() {
                const char = Value.GetChar().GetCharacter()
                char.SetLevel(level)
                char.SetAscension(ascension)
                Log.Logf("Character level set to %d%s", char.GetLevel(), char.IsAscended() ? "+" : "")
            }
        }
    },
    "talent": {
        description: "Sets the talent levels of the current character",
        example: "character talent 9 5 7",
        arguments: ["normal", "skill", "burst"],
        compile({ Value, Log }, args) {
            const [na, es, eb] = args.map(s => toNumber(s))

            return function character_talent() {
                const char = Value.GetChar().GetCharacter()

                char.Set(stats.stat.NORMAL_ATTACK_LEVEL, na)
                char.Set(stats.stat.ELEMENTAL_SKILL_LEVEL, es)
                char.Set(stats.stat.ELEMENTAL_BURST_LEVEL, eb)

                Log.Logf("Character Normal Attack level set to %d", na)
                Log.Logf("Character Elemental Skill level set to %d", es)
                Log.Logf("Character Elemental Burst level set to %d", eb)
            }
        }
    },
    "list": {
        description: "Lists all the registered characters",
        arguments: [],
        compile({ Log }) {
            const table = new strings.Table(
                strings.labels.CHARACTER,
                strings.labels.ELEMENT,
                strings.labels.WEAPON,
                strings.labels.STARS,
                strings.labels.REGION
            )
            const list = characters.GetList()
            list.forEach(gen => (
                table.AddRow(
                    gen.Name,
                    stats.stat.Name(gen.Element),
                    stats.weapon.Name(gen.Weapon),
                    gen.Stars,
                    stats.region.Name(gen.Region)
                )
            ))
            const string = table.String()
            return function character_list() {
                Log.Logf("Total characters: %d", list.length)
                Log.Log("\n" + string)
            }
        }
    },
    "show": {
        description: "Shows the characters in the party",
        arguments: [],
        compile({ Value, Log }) {
            return function character_show() {
                Log.Log("\n" + strings.Character(...Value.Party.GetMembers()))
            }
        }
    },
    "damage": {
        description: "Shows the current character's damage instances",
        arguments: [],
        compile({ Value, Log }) {
            return function character_damage() {
                const char = Value.GetChar()
                Log.Log("\n" + strings.Instance(...char.GetInstances()))
            }
        }
    },
    "stat": {
        description: "Controls character stats directly",
        children: cmd_character_stat()
    }
}))