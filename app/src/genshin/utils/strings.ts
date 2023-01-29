import { GetString, HasKey } from "@src/strings/strings"

/** Gets the instance name in the current language */
export function GetInstanceName(charname: string, instancename: string): string {
    const particular = "ITEM." + charname + "." + instancename
    if (HasKey(particular)) {
        const matchTalent = instancename.match(/_((?:A|C)\d+)$/)
        if (matchTalent) {
            return GetString("LABEL.EFFECT_NAME_TEMPLATE", {
                vars: {
                    prefix: matchTalent[1],
                    name: GetString(particular)
                }
            })
        }
        return GetString(particular)
    }

    const item = "ITEM." + instancename.replace(/^hit_/i, "")
    if (HasKey(item)) {
        return GetString("LABEL.X_HIT", { vars: { name: GetString(item) } })
    }

    return GetString(instancename)
}