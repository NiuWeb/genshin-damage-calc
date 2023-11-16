import { stats } from "@src/core"
import { characters, weapons } from "@src/resources"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_weapon = RunnerCmd(() => ({
    "list": {
        name: "list",
        description: "List all registered weapons",
        compile(_, { logger }) {
            const testbox = characters.Bennett()
            const list = weapons.GetList()
            const table = new strings.Table(
                strings.labels.NAME,
                strings.labels.WEAPON,
                stats.stat.Name(stats.stat.ATK_BASE),
                strings.labels.STAT,
                strings.labels.VALUE,
                strings.labels.STARS,
            )
            for (const wp of list) {
                const ins = wp(testbox)
                ins.SetLevel(90)
                table.AddRow(
                    wp.Name,
                    stats.weapon.Name(wp.Type),
                    ins.GetAtkBase(),
                    stats.stat.Name(ins.GetSubstat()),
                    ins.GetSubstatValue(),
                    wp.Stars)
            }
            table.DecimalPlaces = 4
            const str = table.String()
            return function weapon_list() {
                logger.logf("Total weapons: %d", list.length)
                logger.log("\n" + str)
            }
        }
    },
    "set": {
        name: "set",
        description: "Sets the weapon of the current character",
        example: "weapon set StaffOfHoma",
        arguments: "name",
        compile({ values: [name] }, { context, logger }) {
            const wp = weapons.FindByName(name)
            if (!wp) {
                throw new Error("Cannot find weapon: " + name)
            }
            return function weapon_set() {
                const char = context.GetChar()
                char.SetWeapon(wp)
                logger.logf("Weapon set to %s", wp.Name)
            }
        }
    },
    "level": {
        name: "level",
        description: "Sets the level of the current character's weapon",
        example: "weapon level 70\nweapon level 80+ //level 80 ascended",
        arguments: "level",
        compile({ values: [str] }, { context, logger }) {
            let strval = str
            const ascend = str.endsWith("+")
            if (ascend) {
                strval = str.slice(0, strval.length - 1)
            }
            const level = toNumber(strval)
            const ascension = ascend ? 6 : 0

            return function weapon_level() {
                const wp = context.GetChar().GetWeapon()
                if (!wp) {
                    logger.error("Character weapon is not set")
                    return
                }
                wp.SetLevel(level)
                wp.SetAscension(ascension)
                logger.logf("Weapon level set to %d%s", wp.GetLevel(), wp.IsAscended() ? "+" : "")
            }
        }
    },
    "rank": {
        name: "rank",
        description: "Sets the rank of the current character's weapon",
        example: "weapon rank 5",
        arguments: "rank",
        compile({ values: [str] }, { context, logger }) {
            const rank = toNumber(str)
            return function weapon_rank() {
                const wp = context.GetChar().GetWeapon()
                if (!wp) {
                    logger.error("Character weapon is not set")
                    return
                }
                wp.SetRank(rank)
                logger.logf("Weapon rank set to %d", wp.GetRank())
            }
        }
    },
    "remove": {
        name: "remove",
        description: "Removes the character weapon",
        compile(_, { context, logger }) {
            return function weapon_remove() {
                const wp = context.GetChar()
                wp.SetWeapon(undefined)
                logger.log("Weapon removed")
            }
        }
    }
}))