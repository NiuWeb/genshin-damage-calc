import { Infusion } from "@core/character/infusion"
import { Instance, MotionValue, Multiplier } from "@core/instance"
import { stat } from "@core/stats"
import { Modifier } from "@core/subject"
import { toPlaces } from "@src/utils/numbers"

/** Store registered objects with a tag about their type */
export interface QueryPoolItem {
    type: PoolItem
    object: unknown
}
/** Registered MV or Multiplier */
export interface BaseDmgItem<Item extends Multiplier | MotionValue> {
    instances: Instance[]
    object: Item
}


/** Identifier for the different items that can be registered */
export enum PoolItem {
    Modifier,
    Multiplier,
    MotionValue,
    Infusion,
    Instance,
}

/** Describes a pool item with a string */
export function ItemString(item: QueryPoolItem): string {
    switch (item.type) {
        case PoolItem.Modifier:
            return ModString(item.object as Modifier)
        case PoolItem.Multiplier:
            return MultString(item.object as BaseDmgItem<Multiplier>)
        case PoolItem.MotionValue:
            return MvString(item.object as BaseDmgItem<MotionValue>)
        case PoolItem.Infusion:
            return InfusionString(item.object as Infusion)
        case PoolItem.Instance:
            return InstanceString(item.object as Instance)
    }
}
function InstanceString(inst: Instance): string {
    return "Damage instance: " + inst.Options.Name
}
function InfusionString(inf: Infusion): string {
    const enabled = inf.Enabled ? "Enabled" : "Disabled"
    return `Infusion (${enabled}): ` + statName(inf.Element)
}
function ModString(mod: Modifier): string {
    const enabled = mod.Enabled() ? "Enabled" : "Disabled"
    return `Modifier (${mod.Title}) (${enabled}): ` + statName(mod.GetProp()) + " += " + toPlaces(mod.GetValue(), 4)
}
function MultString(mult: BaseDmgItem<Multiplier>): string {
    const enabled = mult.object.Enabled ? "Enabled" : "Disabled"
    let result = `Multiplier (${enabled}): ` + toPlaces(mult.object.Value, 4) + "\n"
    result += "\tFor instances:\n"
    for (const ins of mult.instances) {
        result += "\t\t" + ins.Options.Name + "\n"
    }
    return result
}
function MvString(mult: BaseDmgItem<MotionValue>): string {
    const enabled = mult.object.Enabled ? "Enabled" : "Disabled"
    let result = `MV (${enabled}): ` + toPlaces(mult.object.Value, 4) + "*" + statName(mult.object.Stat) + "\n"
    result += "\tFor instances:\n"
    for (const ins of mult.instances) {
        result += "\t\t" + ins.Options.Name + "\n"
    }
    return result
}

function statName(prop: number): string {
    try {
        return stat.Name(prop)
    } catch (e) {
        return "unknown stat"
    }
}