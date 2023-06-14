import { stats } from "@src/core"
import { sets, weapons } from "@src/resources"
import { Artifacts, Combination, Effect, Weapon } from "./type"

/**
 * Creates a command to equip a combination.
 */
export function equipCombinationCmd(combination: Combination): string {
    return equipWeaponCmd(combination.weapon) + "\n" + equipArtifactsCmd(combination.artifact)
}

function equipWeaponCmd(weapon: Weapon): string {
    const factory = weapons.FindByName(weapon.name)
    if (!factory) {
        throw new Error(`Weapon ${weapon.name} not found`)
    }

    const lines = [
        `weapon set ${weapon.name}`,
        `weapon rank ${weapon.rank}`
    ]
    for (const ef of factory.Effects) {
        lines.push(
            "effect unset",
            `effect set ${ef.Name}`,
        )
        lines.push(equipEffectCmd(weapon, ef.ApplyOther))
        lines.push("effect unset")
    }

    return lines.join("\n")
}

function equipArtifactsCmd(artifacts: Artifacts): string {
    const lines = [
        "artifact add",
        "artifact main " + [
            artifacts.sands,
            artifacts.goblet,
            artifacts.circlet
        ].map(s => stats.stat.Name(s)).join(" "),
        "artifact stars 5",
        "artifact level 20",
    ]

    if (artifacts.set) {
        lines.push("artifact set " + artifacts.set.join(" "))
        if (artifacts.set[0] === artifacts.set[1]) {
            const factory = sets.FindByName(artifacts.set[0])
            if (!factory) {
                throw new Error(`Set ${artifacts.set[0]} not found`)
            }
            for (const ef of factory.Piece4) {
                lines.push(
                    "effect unset",
                    `effect set ${ef.Name}`,
                )
                lines.push(equipEffectCmd(artifacts, ef.ApplyOther))
                lines.push("effect unset")
            }
        }
    }

    return lines.join("\n")
}

function equipEffectCmd(effect: Partial<Effect>, applyOther?: boolean): string {
    const lines: string[] = []
    if (Number.isFinite(effect.stacks)) {
        lines.push(`effect stacks ${effect.stacks}`)
    }
    if (effect.condition) {
        lines.push(`effect condition ${effect.condition.join(" ")}`)
    }
    if (effect.aura) {
        lines.push(`effect aura ${effect.aura.join(" ")}`)
    }
    if (effect.target && applyOther) {
        lines.push(
            "effect unapply all",
            `effect apply ${effect.target.join(" ")}`
        )
    }
    return lines.join("\n")
}