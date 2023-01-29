import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "VentiC1",
    OnApply: new effect.Builder()
        .instance
        .Location("Normal")
        .Options({
            Name: "HIT_C1",
            Element: stats.stat.PHYSICAL_DMG,
            Talent: stats.stat.AIMED_SHOT_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.PHYSICAL_1A,
                    Talent: stats.stat.NORMAL_ATTACK_LEVEL,
                    Stat: stats.stat.ATK,
                    Initial: 0.4386 * 0.33,
                },
            ],
        })
        .Next()
        .instance
        .Location("Normal")
        .Options({
            Name: "HIT_CHARGED_C1",
            Element: stats.stat.ANEMO_DMG,
            Talent: stats.stat.CHARGED_AIMED_SHOT_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.PHYSICAL_1A,
                    Talent: stats.stat.NORMAL_ATTACK_LEVEL,
                    Stat: stats.stat.ATK,
                    Initial: 1.24 * 0.33,
                },
            ],
        })
        .Next()
        .Build()
})

export const c2 = effect.Factory({
    Name: "VentiC2",
    ApplyOther: true,
    Conditions: ["AIRBORNE", "NO_AIRBORNE"],
    MaxConditions: 1,
    OnApply: new effect.Builder()
        .stat
        .Enemy(stats.stat.ANEMO_RES, stats.stat.PHYSICAL_RES)
        .Values(-0.12)
        .Next()

        .Where({ effect: { conditions: ["AIRBORNE"] } })
        .stat
        .Enemy(stats.stat.ANEMO_RES, stats.stat.PHYSICAL_RES)
        .Values(-0.12)
        .Build()
})

export const c3 = effect.Factory({
    Name: "VentiC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "VentiC4",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ANEMO_DMG)
        .Values(0.25)
        .Build()
})

export const c5 = effect.Factory({
    Name: "VentiC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "VentiC6",
    ApplyOther: true,
    OnApply(tg, ef, reg) {
        const enemy = tg.GetCharacter().GetEnemy()
        const qAbsorb = ef.Owner.FindEffect("VentiQ")
        if (!qAbsorb) {
            throw new Error("Venti Q not found")
        }
        reg.Modifier(enemy.Subject.CreateModifier(stats.stat.ANEMO_RES, -0.2))
        const mod2 = reg.Modifier(enemy.Subject.CreateModifier(stats.stat.ANEMO_RES, 0))

        const trigger = () => {
            const auras = qAbsorb.GetAuras()
            if (!auras.length || auras[0] === stats.aura.NONE) {
                mod2.SetValue(0)
            } else {
                const el = stats.DmgToRes(stats.AuraToDmg(auras[0]))
                mod2.SetValue(-0.2)
                mod2.SetProp(el)
            }
        }
        trigger()

        reg.Observer(qAbsorb.CreateObserver(effect.EffectEvent.CHANGE_AURAS, trigger))

        return () => 0
    }
})