import { effect, instance, stats, charbox, artifact } from "@src/core"
import { FindByName as FindSetByName } from "@src/resources/sets"
import { Horizontal } from "./horizontal"
import { labels } from "./labels"
import { Table } from "./table"

/** Converts damage instances to string */
export function Instance(...instances: instance.Instance[]): string {
    const table = new Table(labels.HIT, labels.ELEMENT, labels.TALENT, labels.NO_CRIT, labels.CRIT, labels.AVG)
    instances.forEach(instance => table.AddRow(
        instance.Options.Name,
        stats.stat.Name(instance.GetElement()),
        stats.stat.Name(instance.Options.Talent),
        instance.DmgNoCrit(true),
        instance.DmgCrit(true),
        instance.DmgAvg(true),
    ))
    return table.String()
}

/** Converts characters into a string */
export function Character(...characters: charbox.Charbox[]): string {
    const result: string[] = []
    for (let i = 0; i < characters.length; i++) {
        result[2 * i] = _character(characters[i])
        result[2 * i + 1] = " ".repeat(4)
    }
    return Horizontal(...result)
}


function _character(box: charbox.Charbox): string {
    const char = box.GetCharacter()
    let asc: string
    if (char.IsAscended()) {
        asc = "+"
    } else {
        asc = ""
    }
    let result = `(${char.Options.Stars}*) ${char.Options.Name} ${char.GetLevel()}${asc}`
    result += ` (${char.Get(stats.stat.NORMAL_ATTACK_LEVEL)}/${char.Get(stats.stat.ELEMENTAL_SKILL_LEVEL)}/${char.Get(stats.stat.ELEMENTAL_BURST_LEVEL)})\n`

    const wp = box.GetWeapon()
    if (wp) {
        if (wp.IsAscended()) {
            asc = "+"
        } else {
            asc = ""
        }
        result += `(${wp.Options.Stars}*) ${wp.Options.Name} ${wp.GetLevel()}${asc} (R${wp.GetRank()})\n`
    } else {
        result += "(No weapon)\n"
    }

    const givennames = box.GetArtifacts()?.GetActiveSets()
    if (givennames && givennames.length > 0) {
        const names = givennames.map(name => FindSetByName(name)?.Name)
        if (names[0] === names[1]) {
            result += names[0] + " (4)\n"
        } else {
            names.forEach(name => {
                if (name && name !== "") {
                    result += name + " (2)\n"
                }
            })
        }
    }

    const table = new Table(labels.STAT, labels.VALUE)
    table.DecimalPlaces = 4
    table.AddRow(stats.stat.Name(stats.stat.ATK), char.Get(stats.stat.ATK))
    table.AddRow(stats.stat.Name(stats.stat.DEF), char.Get(stats.stat.DEF))
    table.AddRow(stats.stat.Name(stats.stat.HP), char.Get(stats.stat.HP))
    table.AddRow(stats.stat.Name(stats.stat.CRIT_RATE), char.Get(stats.stat.CRIT_RATE))
    table.AddRow(stats.stat.Name(stats.stat.CRIT_DMG), char.Get(stats.stat.CRIT_DMG))
    table.AddRow(stats.stat.Name(stats.stat.ENERGY_RECHARGE), char.Get(stats.stat.ENERGY_RECHARGE))
    table.AddRow(stats.stat.Name(stats.stat.ELEMENTAL_MASTERY), char.Get(stats.stat.ELEMENTAL_MASTERY))
    const st = char.Options.Element
    table.AddRow(stats.stat.Name(st), char.Get(st))

    result += table.String()
    return result
}

/** prints a list of effects as string */
export function Effect(...efs: effect.Effect[]): string {
    const table = new Table(labels.NAME, labels.ENABLED, labels.STACKS, labels.OWNER, labels.TARGET)
    for (const ef of efs) {
        const targets = ef.GetTargets().map(tg => tg.GetCharacter().Options.Name)
        table.AddRow(
            ef.Options.Name,
            ef.Enabled(),
            ef.GetStacks(),
            ef.Owner.GetCharacter().Options.Name,
            targets.join(", "),
        )
    }
    return table.String()
}

/** prints details about an effect */
export function EffectDetail(ef: effect.Effect): string {
    let result = ef.Options.Name + "\n"
    const det = new Table(labels.OWNER, labels.ENABLED, labels.STACKS)
    det.AddRow(ef.Owner.GetCharacter().Options.Name, ef.Enabled(), ef.GetStacks() + "/" + ef.Options.MaxStacks)
    result += det.String() + "\n"

    const targets = new Table(labels.TARGET)
    for (const tg of ef.GetTargets()) {
        targets.AddRow(tg.GetCharacter().Options.Name)
    }

    const conditions = new Table(labels.CONDITION)
    for (const tg of ef.Options.Conditions) {
        conditions.AddRow(tg + " (" + ef.HasCondition(tg) + ")")
    }
    const auras = new Table(labels.AURA)
    for (const aura of stats.aura.Values()) {

        if (ef.HasAura(aura)) {
            auras.AddRow(stats.aura.Name(aura))
        }
    }
    result += Horizontal(targets.String(), conditions.String(), auras.String())
    return result
}

/** converts artifacts to string */
export function Artifact(...arts: artifact.Artifact[]): string {

    const result: string[] = []
    for (let i = 0; i < arts.length; i++) {
        result[2 * i] = _artifact(arts[i])
        result[2 * i + 1] = " ".repeat(4)
    }
    return Horizontal(...result)
}

/** Converts a single artifact to string */
function _artifact(art: artifact.Artifact): string {
    let result = `(${art.GetStars()}*) ${stats.piece.Name(art.GetPiece())} (+${art.GetLevel()})\n`

    const givenname = art.GetSet()
    if (givenname) {
        const bonus = FindSetByName(givenname)
        if (bonus) {
            result += labels.SET + ": " + bonus.Name + "\n"
        } else {
            result += labels.SET + ": " + labels.NONE + "\n"
        }
    } else {
        result += labels.SET + ": " + labels.NONE + "\n"
    }

    const table = new Table(labels.STAT, labels.VALUE)
    table.DecimalPlaces = 4
    table.AddRow(stats.stat.Name(art.GetMainstat()), art.GetMainstatValue())

    for (let i = 0; i < art.SubstatsLength(); i++) {
        table.AddRow(stats.stat.Name(art.GetSubstat(i)), art.GetSubstatValue(i))
    }

    result += table.String()
    return result
}
/** prints the artifact rolls as string */
export function ArtifactRolls(art: artifact.Artifact): string {
    const formatted = art.FormatRolls()
    const table = new Table(labels.STAT, "", "", "", "", "", "")
    formatted.forEach(([stat, rolls]) => (
        table.AddRow(stats.stat.Name(stat), ...rolls)
    ))
    table.DecimalPlaces = 4
    return `${stats.piece.Name(art.GetPiece())}\n` + table
}