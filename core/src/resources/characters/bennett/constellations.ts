import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "BennettC1",
    OnApply(target, ef, reg) {
        const _qBonus = target.FindEffect("BennettQ")
        if (!_qBonus) {
            throw new Error("Bennett Burst effect not found")
        }
        const qBonus = _qBonus
        function trigger() {
            if (qBonus.Enabled()) {
                qBonus.Disable()
                qBonus.Enable()
            }
        }
        trigger()

        reg.Observer(ef.CreateObserver(effect.EffectEvent.ENABLE, trigger))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.DISABLE, trigger))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_TARGET, trigger))

        return () => 0
    }
})

export const c2 = effect.Factory({
    Name: "BennettC2",
    OnApply: new effect.Builder()
        .Where({ target: { hp: { leq: 0.7 } } })
        .stat
        .Char(stats.stat.ENERGY_RECHARGE)
        .Values(0.3)
        .Build()
})

export const c3 = effect.Factory({
    Name: "BennettC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "BennettC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "BennettC6",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.PYRO_DMG)
        .Values(0.15)
        .Next()

        .Where({ target: { weapon: [stats.weapon.CLAYMORE, stats.weapon.SWORD, stats.weapon.POLEARM] } })
        .infusion
        .Set(stats.stat.PYRO_DMG, false)
        .Build()
})