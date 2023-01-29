import { effect, scaling, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "YanfeiA1",
    OnApply(target, _, reg) {
        const char = target.GetCharacter()
        const seals = target.FindEffect("YanfeiSeal")
        if (!seals) {
            throw new Error("Cannot find Yanfei Scarlet Seals")
        }
        const mod = reg.Modifier(char.CreateModifier(stats.stat.PYRO_DMG, 0))
        const trigger = () => {
            if (char.GetAscension() < 1) {
                mod.SetValue(0)
                return
            }
            mod.SetValue(seals.GetStacks() * 0.05)
        }
        trigger()

        reg.Observer(seals.CreateObserver(effect.EffectEvent.CHANGE_STACKS, trigger))
        reg.Observer(char.CreateObserver(stats.stat.LEVEL, trigger))
        reg.Observer(char.CreateObserver(stats.stat.ASCENSION, trigger))

        return () => 0
    }
})

export const a4 = effect.Factory({
    Name: "YanfeiA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .instance
        .Location("Normal")
        .Options({
            Name: "HIT_A4",
            Element: stats.stat.PYRO_DMG,
            Talent: stats.stat.CHARGED_ATTACK_DMG,
            Scaling: [{
                Stat: stats.stat.ATK,
                Initial: 0.8,
                Scaling: scaling.TalentScaling.NONE,
                Talent: stats.stat.NONE
            }]
        })
        .Build()
})