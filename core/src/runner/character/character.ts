import { stats } from "@src/core"
import { characters } from "@src/resources"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"
import { cmd_character_stat } from "./stat"

export const cmd_character = RunnerCmd(() => ({
    "add": {
        name: "add",
        description: "Adds a new character.",
        example: "character add hutao",
        arguments: "name",
        compile({ values: [name] }, { context, logger }) {
            const generator = characters.FindByName(name)
            if (!generator) {
                throw new Error("Character not found: " + name)
            }
            return function character_add() {
                const existing = context.Party.FindMember(name)
                if (existing) {
                    logger.errorf("Cannot add character %s because it is already added", generator.Name)
                    return
                }
                const char = generator()
                context.Party.Add(char)
                logger.logf("Character %s added to the party", char.GetCharacter().Options.Name)

                context.GetCompiler().compileString(
                    `character set ${generator.Name}`,
                    { line: logger.line }
                )()
            }
        }
    },
    "remove": {
        name: "remove",
        description: "Removes a character from the party",
        example: "character remove Hutao",
        arguments: "name",
        compile({ values: [name] }, { context, logger }) {
            return function character_remove() {
                const member = context.Party.FindMember(name)
                if (!member) {
                    logger.errorf("Cannot remove character %s because it is not added", name)
                    return
                }
                if (!context.Party.Remove(member)) {
                    logger.errorf("Cannot remove character %s", member.GetCharacter().Options.Name)
                } else {
                    member.GetEffects().forEach(ef => ef.Disable().UnapplyAll())
                    if (context.GetChar() === member) {
                        context.GetCompiler().compileString(
                            "character unset",
                            { line: logger.line }
                        )()
                    }
                    logger.logf("Character %s removed", member.GetCharacter().Options.Name)
                }
            }
        }
    },
    "set": {
        name: "set",
        description: "Sets the current character",
        example: "character set Hutao",
        arguments: "name",
        compile({ values: [name] }, { context, logger }) {
            return function character_set() {
                const member = context.Party.FindMember(name)
                if (!member) {
                    logger.errorf("Cannot set character %s because it is not added", name)
                    return
                }
                context.SetChar(member)
                logger.logf("Character %s set as current", member.GetCharacter().Options.Name)
            }
        }
    },
    "unset": {
        name: "unset",
        description: "Unsets the current character",
        compile(_, { context, logger }) {
            return function character_unset() {
                context.SetChar(undefined)
                logger.log("Character unset. There is no current character selected")
            }
        }
    },
    "level": {
        name: "level",
        description: "Sets the level of the current character",
        example: "character level 70\ncharacter level 80+ // level 80 ascended",
        arguments: "level",
        compile({ values: [str] }, { context, logger }) {
            let strval = str
            const ascend = str.endsWith("+")
            if (ascend) {
                strval = str.slice(0, strval.length - 1)
            }
            const level = toNumber(strval)
            const ascension = ascend ? 6 : 0

            return function character_level() {
                const char = context.GetChar().GetCharacter()
                char.SetLevel(level)
                char.SetAscension(ascension)
                logger.logf("Character level set to %d%s", char.GetLevel(), char.IsAscended() ? "+" : "")
            }
        }
    },
    "talent": {
        name: "talent",
        description: "Sets the talent levels of the current character",
        example: "character talent 9 5 7",
        arguments: "normal skill burst",
        compile({ values }, { context, logger }) {
            const [na, es, eb] = values.map(s => toNumber(s))

            return function character_talent() {
                const char = context.GetChar().GetCharacter()

                char.Set(stats.stat.NORMAL_ATTACK_LEVEL, na)
                char.Set(stats.stat.ELEMENTAL_SKILL_LEVEL, es)
                char.Set(stats.stat.ELEMENTAL_BURST_LEVEL, eb)

                logger.logf("Character Normal Attack level set to %d", na)
                logger.logf("Character Elemental Skill level set to %d", es)
                logger.logf("Character Elemental Burst level set to %d", eb)
            }
        }
    },
    "list": {
        name: "list",
        description: "Lists all the registered characters",
        compile(_, { logger }) {
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
                logger.logf("Total characters: %d", list.length)
                logger.log("\n" + string)
            }
        }
    },
    "show": {
        name: "show",
        description: "Shows the characters in the party",
        compile(_, { context, logger }) {
            return function character_show() {
                logger.log("\n" + strings.Character(...context.Party.GetMembers()))
            }
        }
    },
    "damage": {
        name: "damage",
        description: "Shows the current character's damage instances",
        compile(_, { context, logger }) {
            return function character_damage() {
                const char = context.GetChar()
                logger.log("\n" + strings.Instance(...char.GetInstances()))
            }
        }
    },
    "stat": {
        name: "stat",
        description: "Controls character stats directly",
        children: cmd_character_stat()
    }
}))