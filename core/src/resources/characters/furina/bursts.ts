import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.1141,
            },
        ],
    },
]


export const qBonus = effect.Factory({
    Name: "FurinaQ",
    MaxStacks: 400,
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .stat
        .Char(stats.stat.ALL_DMG)
        .Values(1)
        .Stacks()
        .Map((stacks, _, ef) => {
            const char = ef.Owner

            const c1 = char.FindEffect("FurinaC1")
            if(!c1 || !c1.Enabled()) {
                if(ef.GetStacks() > 300) {
                    ef.SetStacks(300)
                }
            }

            let r = 0.05 + 0.02 * char.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL)
            r = r * stacks / 100
            return r
        })
        .Build()
})