import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "YoimiyaA1",
    MaxStacks: 10,
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.PYRO_DMG)
        .Values(0.02)
        .Stacks()
        .Build()
})

export const a4 = effect.Factory({
    Name: "YoimiyaA4",
    ApplyOther: true,
    ApplySelf: false,
    OnApply(tg, ef, reg) {
        const char = tg.GetCharacter()
        const owner = ef.Owner.GetCharacter()
        const a1 = ef.Owner.FindEffect("YoimiyaA1")
        if (!a1) {
            throw new Error("Cannot find Yoimiya A1")
        }
        const mod = reg.Modifier(char.CreateModifier(stats.stat.ATK_PERCENT, 0))
        const trigger = () => {
            if (owner.GetAscension() < 4) {
                mod.SetValue(0)
                return
            }
            mod.SetValue(0.1 + 0.01 * a1.GetStacks())
        }
        trigger()

        reg.Observer(owner.CreateObserver(stats.stat.LEVEL, trigger))
        reg.Observer(owner.CreateObserver(stats.stat.ASCENSION, trigger))
        reg.Observer(a1.CreateObserver(effect.EffectEvent.CHANGE_STACKS, trigger))

        return () => 0
    }
})