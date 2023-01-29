import { charbox, effect, subject } from "@src/core"
/**
 * Properties for an effect of the "Millennial Movement" series
 */
export interface MillennialMovement {
    /** effect name */
    Name: string
    /** effect action */
    OnApply: effect.Options["OnApply"]
}

const instances = new Map<charbox.Charbox, Set<subject.Modifier>>()

function getOrCreate(target: charbox.Charbox) {
    const set = instances.get(target)
    if (!set) {
        const created = new Set<subject.Modifier>()
        instances.set(target, created)
        return created
    }
    return set
}

/**
 * creates an effect of the "Millennial Movement" series
 */
export const MillennialMovement = ({ Name, OnApply }: MillennialMovement) => {
    return effect.Factory({
        Name,
        MaxRank: 5,
        ApplyOther: true,
        OnApply(target, ef, reg) {
            OnApply(target, ef, reg)
            const mods = reg.GetModifiers()
            const set = getOrCreate(target)
            mods.forEach(mod => set.add(mod))

            function validate() {
                for (const mod of mods) {
                    // is there another modifier that conflicts with this one
                    const conflict = Array.from(set).some(other => (
                        other !== mod && // must be a different mod
                        other.GetProp() === mod.GetProp() && // mods must have the same prop
                        other.Enabled() && // other mod must be enabled
                        other.GetValue() !== 0 // other mod must have a non-zero value
                    ))
                    if (conflict) { // remove value from this mod
                        mod.SetValue(0)
                        mod.Disable()
                    }
                }
            }
            validate()

            for (const ev of effect.EffectEvent.Values()) {
                reg.Observer(ef.CreateObserver(ev, validate))
            }

            return () => {
                mods.forEach(mod => set.delete(mod))
                if (set.size === 0) {
                    instances.delete(target)
                }
            }
        }
    })
}