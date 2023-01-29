import { effect, scaling, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "KazuhaA1",
    MaxAuras: 1,
    ValidAuras: stats.Swirlable,
    OnApply(target, ef, reg) {
        eAbsorbEf(target, ef, reg)

        function trigger() {
            const ins = target.FindNormal("HIT_A1")
            if (!ins) { return }
            const aura = ef.GetAuras()[0]
            if (!aura) { return }
            ins.Options.Element = stats.AuraToDmg(aura)
        }
        trigger()

        reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_AURAS, trigger))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.ENABLE, trigger))

        return () => 0
    },
})

const eAbsorbEf = new effect.Builder()
    .Where({ target: { ascension: 1 } })
    .instance
    .Location("Normal")
    .Options({
        Name: "HIT_A1",
        Element: stats.stat.PYRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.NONE,
                Stat: stats.stat.ATK,
                Initial: 2,
                Talent: stats.stat.NONE
            }
        ],
    })
    .Build()


export const a4 = effect.Factory({
    Name: "KazuhaA4",
    ApplyOther: true,
    MaxAuras: Infinity,
    ValidAuras: stats.Swirlable,
    OnApply(target, ef, reg) {
        const owner = ef.Owner.GetCharacter()
        const char = target.GetCharacter()
        const mods = stats.Elements
            .filter(e => e !== stats.stat.PHYSICAL_DMG)
            .map(res => reg.Modifier(char.CreateModifier(res, 0)))

        function trigger() {
            /** elemental dmg the effect has applied */
            const applied = ef.GetAuras()
                .map(aura => stats.AuraToDmg(aura))

            for (const mod of mods) {
                if (applied.includes(mod.GetProp()) && owner.GetAscension() >= 4) {
                    mod.SetValue(0.04 / 100 * owner.Get(stats.stat.ELEMENTAL_MASTERY))
                } else {
                    mod.SetValue(0)
                }
            }
        }
        trigger()

        reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_AURAS, trigger))
        reg.Observer(owner.CreateObserver(stats.stat.ELEMENTAL_MASTERY, trigger))
        reg.Observer(owner.CreateObserver(stats.stat.LEVEL, trigger))
        reg.Observer(owner.CreateObserver(stats.stat.ASCENSION, trigger))

        return () => 0
    },
})