import { stats } from "@src/core"
import { characters, weapons } from "@src/resources"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_weapon = RunnerCmd(() => ({
    "list": {
        description: "List all registered weapons",
        arguments: [],
        compile({ Log }) {
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
                Log.Logf("Total weapons: %d", list.length)
                Log.Log("\n" + str)
            }
        }
    },
    "set": {
        description: "Sets the weapon of the current character",
        example: "weapon set StaffOfHoma",
        arguments: ["name"],
        compile({ Value, Log }, [name]) {
            const wp = weapons.FindByName(name)
            if (!wp) {
                throw Log.Throwf("Cannot find weapon %s", name)
            }
            return function weapon_set() {
                const char = Value.GetChar()
                char.SetWeapon(wp)
                Log.Logf("Weapon set to %s", wp.Name)
            }
        }
    },
    "level": {
        description: "Sets the level of the current character's weapon",
        example: "weapon level 70\nweapon level 80+ //level 80 ascended",
        arguments: ["level"],
        compile({ Value, Log }, [str]) {
            let strval = str
            const ascend = str.endsWith("+")
            if (ascend) {
                strval = str.slice(0, strval.length - 1)
            }
            const level = toNumber(strval)
            const ascension = ascend ? 6 : 0

            return function weapon_level() {
                const wp = Value.GetChar().GetWeapon()
                if (!wp) {
                    Log.Error("Character weapon is not set")
                    return
                }
                wp.SetLevel(level)
                wp.SetAscension(ascension)
                Log.Logf("Weapon level set to %d%s", wp.GetLevel(), wp.IsAscended() ? "+" : "")
            }
        }
    },
    "rank": {
        description: "Sets the rank of the current character's weapon",
        example: "weapon rank 5",
        arguments: ["rank"],
        compile({ Value, Log }, [str]) {
            const rank = toNumber(str)
            return function weapon_rank() {
                const wp = Value.GetChar().GetWeapon()
                if (!wp) {
                    Log.Error("Character weapon is not set")
                    return
                }
                wp.SetRank(rank)
                Log.Logf("Weapon rank set to %d", wp.GetRank())
            }
        }
    },
    "remove": {
        description: "Removes the character weapon",
        arguments: [],
        compile({ Value, Log }) {
            return function weapon_remove() {
                const wp = Value.GetChar()
                wp.SetWeapon(undefined)
                Log.Log("Weapon removed")
            }
        }
    }
}))