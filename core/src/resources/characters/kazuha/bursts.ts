import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.ANEMO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 2.624,
            }
        ],
    },
    {
        Name: strings.hits.HIT_Q_DOT,
        Element: stats.stat.ANEMO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.2,
            }
        ],
    },
]

export const qAbsorb = effect.Factory({
    Name: "KazuhaQ",
    MaxAuras: 1,
    ValidAuras: stats.Swirlable,
    OnApply(target, ef, reg) {
        qAbsorbEf(target, ef, reg)

        function trigger() {
            const ins = target.FindBurst(strings.hits.HIT_Q + "_ADDITIONAL")
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

const qAbsorbEf = new effect.Builder()
    .instance
    .Location("Burst")
    .Options({
        Name: strings.hits.HIT_Q + "_ADDITIONAL",
        Element: stats.stat.PYRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.36,
                Talent: stats.stat.ELEMENTAL_BURST_LEVEL
            }
        ],
    })
    .Build()