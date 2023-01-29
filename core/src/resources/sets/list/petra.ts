import { artifact, effect, stats } from "@src/core"

export const ArchaicPetra = artifact.Set({
    Name: "ArchaicPetra",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "ArchaicPetra2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.GEO_DMG)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "ArchaicPetra4",
            MaxAuras: 1,
            ApplyOther: true,
            ValidAuras: stats.Swirlable,
            OnApply(target, ef, reg) {
                const char = target.GetCharacter()
                const mods = stats.Elements
                    .filter(s => s !== stats.stat.PHYSICAL_DMG)
                    .map(el => reg.Modifier(char.CreateModifier(el, 0)))

                function trigger() {
                    const applied = ef.GetAuras().map(aura => stats.AuraToDmg(aura))
                    for (const mod of mods) {
                        if (applied.includes(mod.GetProp())) {
                            mod.SetValue(0.4)
                        } else {
                            mod.SetValue(0)
                        }
                    }
                }

                reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_AURAS, trigger))

                return () => 0
            },
        })
    ]
})