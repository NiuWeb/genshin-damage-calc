import { artifact, effect, stats } from "@src/core"
import { Normal } from "@src/core/instance"

export const OceanHuedClam = artifact.Set({
    Name: "OceanHuedClam",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "OceanHuedClam2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HEALING_BONUS)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "OceanHuedClam4",
            MaxStacks: 30e3,
            OnApply(target, ef, reg) {
                const [, , bubble] = reg.Instance(target, "Extra", Normal("HIT_OceanHuedClam", target.GetCharacter()))
                bubble.Options.Def = false
                bubble.Options.Crit = false
                bubble.Options.Dmg = false

                const mod = reg.Modifier(bubble.Subject.CreateModifier(stats.stat.DMG_FLAT, 0))

                function trigger() {
                    const dmg = ef.GetStacks() * 0.9
                    mod.SetValue(dmg)
                }
                trigger()

                reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_STACKS, trigger))

                return () => 0
            },
        })
    ]
})