import { effect, stats } from "@src/core"

export const c3 = effect.Factory({
    Name: "SucroseC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "SucroseC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "SucroseC6",
    ApplyOther: true,
    OnApply(tg, ef, reg) {
        const qAbsorb = ef.Owner.FindEffect("SucroseQ")
        const char = tg.GetCharacter()
        if (!qAbsorb) {
            throw new Error("Cannot find Sucrose Q")
        }
        const mod = reg.Modifier(char.CreateModifier(stats.stat.PYRO_DMG, 0))

        const trigger = () => {
            const auras = qAbsorb.GetAuras()
            if (!auras.length || auras[0] === stats.aura.NONE) {
                mod.SetValue(0)
            }
            const element = stats.AuraToDmg(auras[0])
            mod.SetProp(element)
            mod.SetValue(0.2)
        }
        trigger()

        reg.Observer(qAbsorb.CreateObserver(effect.EffectEvent.CHANGE_AURAS, trigger))
        return () => 0
    }
})