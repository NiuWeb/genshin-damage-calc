import { artifact, effect, stats } from "@src/core"

export const ViridescentVenerer = artifact.Set({
    Name: "ViridescentVenerer",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "ViridescentVenerer2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ANEMO_DMG)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "ViridescentVenerer4_1",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.SWIRL_DMG)
                .Values(0.6)
                .Build()
        }),
        effect.Factory({
            Name: "ViridescentVenerer4",
            ApplyOther: true,
            ValidAuras: stats.Swirlable,
            MaxAuras: 5,
            OnApply(target, ef, reg) {
                const enemy = target.GetCharacter().GetEnemy()
                const mods = resList.map(res => reg.Modifier(enemy.Subject.CreateModifier(res, 0)))

                function trigger() {
                    if (ef.Owner.GetCharacter().Options.Element !== stats.stat.ANEMO_DMG) {
                        return
                    }
                    /** elemental RES the effect has applied */
                    const appliedRes = ef.GetAuras()
                        .map(aura => stats.DmgToRes(stats.AuraToDmg(aura)))

                    for (const mod of mods) {
                        if (appliedRes.includes(mod.GetProp())) {
                            mod.SetValue(VV_RES)
                        } else {
                            mod.SetValue(0)
                        }
                    }
                }
                trigger()

                reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_AURAS, trigger))

                return () => 0
            },
        }),
    ]
})

const VV_RES = -0.4

/** list of elemental resistances */
const resList = stats.Elements
    .filter(el => el !== stats.stat.PHYSICAL_DMG)
    .map(el => stats.DmgToRes(el))