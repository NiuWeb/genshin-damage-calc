import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "NahidaC1",
    OnApply(target, ef, reg) {
        const _qBonus = target.FindEffect("NahidaQ")
        if (!_qBonus) {
            throw new Error("Nahida Burst effect not found")
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
    Name: "NahidaC2",
    ApplyOther: true,
    MaxAuras: 1,
    ValidAuras: [stats.aura.QUICKEN],
    OnApply(target, ef, reg) {
        c2Builder(target, ef, reg)
        const names = ["BURGEON", "BLOOM", "HYPERBLOOM", "BURNING"]
        const hits = names.map(name => target.FindTr("HIT_" + name))

        for (const hit of hits) {
            if (!hit) { continue }
            reg.Modifier(hit.Subject.CreateModifier(stats.stat.CRIT_RATE, 0.2))
            reg.Modifier(hit.Subject.CreateModifier(stats.stat.CRIT_DMG, 1))
        }

        return () => 0
    },
})
const c2Builder = new effect.Builder()
    .Where({ effect: { aura: [stats.aura.QUICKEN] } })
    .stat
    .Enemy(stats.stat.DEFREDUCTION)
    .Values(0.3)
    .Build()

export const c3 = effect.Factory({
    Name: "NahidaC3",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "NahidaC4",
    MaxStacks: 4,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Stacks([0, 100, 120, 140, 160])
        .Build()
})

export const c5 = effect.Factory({
    Name: "NahidaC5",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "NahidaC6",
    OnApply(target, ef, reg) {
        c6Builder(target, ef, reg)

        function trigger() {
            const qBonus = target.FindEffect("NahidaQ")
            const a4 = target.FindEffect("NahidaA4")
            if (qBonus && qBonus.Enabled()) {
                qBonus.Disable()
                qBonus.Enable()
            }
            if (a4 && a4.Enabled()) {
                a4.Disable()
                a4.Enable()
            }
        }
        trigger()

        reg.Observer(ef.CreateObserver(effect.EffectEvent.ENABLE, trigger))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.DISABLE, trigger))

        return () => 0
    },
})

const c6Builder = new effect.Builder()
    .instance
    .Location("Skill")
    .Options({
        Name: "HIT_C6",
        Element: stats.stat.DENDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.NONE,
                Stat: stats.stat.ATK,
                Talent: stats.stat.NONE,
                Initial: 2,
            },
            {
                Scaling: scaling.TalentScaling.NONE,
                Stat: stats.stat.ELEMENTAL_MASTERY,
                Talent: stats.stat.NONE,
                Initial: 4,
            },
        ],
    },)
    .Build()