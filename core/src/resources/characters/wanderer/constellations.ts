import { effect, instance, stats, } from "@src/core"

export const c1 = effect.Factory({
    Name: "WandererC1",
    OnApply(tg, ef, reg) {
        const a4 = tg.FindEffect("WandererA4")
        if (!a4) {
            throw new Error("Cannot find Wanderer A4")
        }
        let mv: instance.MotionValue | undefined = undefined
        const trigger = () => {
            const hit = tg.FindInstance("HIT_A4")
            if (!hit || mv) { return }
            mv = reg.Mv({ Stat: stats.stat.ATK, Value: 0.25, Enabled: true }, hit)
        }
        trigger()

        reg.Observer(tg.GetCharacter().CreateObserver(stats.stat.LEVEL, trigger))
        reg.Observer(tg.GetCharacter().CreateObserver(stats.stat.ASCENSION, trigger))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.ENABLE, trigger))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.DISABLE, trigger))

        return () => 0
    }
})

export const c2 = effect.Factory({
    Name: "WandererC2",
    MaxStacks: 120,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_DMG)
        .Values(0.04)
        .Stacks()
        .Map(v => Math.min(2, v))
        .Build()
})

export const c3 = effect.Factory({
    Name: "WandererC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "WandererC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
