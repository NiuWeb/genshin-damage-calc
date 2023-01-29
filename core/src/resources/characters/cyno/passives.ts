import { effect, scaling, stats, subject } from "@src/core"

export const a1 = effect.Factory({
    Name: "CynoA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .instance
        .Location("Skill")
        .Options({
            Name: "HIT_A1",
            Element: stats.stat.ELECTRO_DMG,
            Talent: stats.stat.ELEMENTAL_SKILL_DMG,
            Scaling: [
                {
                    Stat: stats.stat.ATK,
                    Initial: 0.35,
                    Scaling: scaling.TalentScaling.NONE,
                    Talent: stats.stat.NONE
                }
            ]
        })
        .Next()

        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.ALL_DMG)
        .Instance("HIT_E", "HIT_E_2")
        .Values(0.35)
        .Build()
})


const a1p1 = new effect.Builder()
    .Where({ target: { ascension: 4 } })
    .observe.Target(stats.stat.ELEMENTAL_MASTERY)
    .stat
    .Char(stats.stat.DMG_FLAT)
    .Instance(/N\d_Q$/i)
    .Values(1.5)
    .Map((v, tg) => (
        v * tg.GetCharacter().Get(stats.stat.ELEMENTAL_MASTERY)
    ))
    .Build()

export const a4 = effect.Factory({
    Name: "CynoA4",
    OnApply(target, ef, reg) {
        a1p1(target, ef, reg)
        const char = target.GetCharacter()
        const a1 = target.FindEffect("CynoA1")
        let mod: subject.Modifier | undefined = undefined
        if (!a1) {
            throw new Error("Cannot find Cyno A1")
        }

        function trigger() {
            if (!mod) {
                const skill = target.FindInstance("HIT_A1")
                if (!skill) {
                    return
                }
                mod = reg.Modifier(skill.Subject.CreateModifier(stats.stat.DMG_FLAT, 0))
            }
            if (!mod) {
                return
            }
            if (char.GetAscension() >= 4) {
                mod.SetValue(2.5 * char.Get(stats.stat.ELEMENTAL_MASTERY))
            } else {
                mod.SetValue(0)
            }
        }
        trigger()

        for (const ev of effect.EffectEvent.Values()) {
            reg.Observer(a1.CreateObserver(ev, trigger))
        }
        reg.Observer(char.CreateObserver(stats.stat.ELEMENTAL_MASTERY, trigger))
        reg.Observer(char.CreateObserver(stats.stat.LEVEL, trigger))
        reg.Observer(char.CreateObserver(stats.stat.ASCENSION, trigger))

        return () => 0
    }
})