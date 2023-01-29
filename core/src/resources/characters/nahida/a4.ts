import { effect, stats } from "@src/core"
import { Modifier } from "@src/core/subject"
import { strings } from "@src/strings"

export const a4 = effect.Factory({
    Name: "NahidaA4",
    OnApply(target, _, reg) {
        const char = target.GetCharacter()
        const skill = target.FindSkill(strings.hits.HIT_E_DOT)
        if (!skill) {
            throw new Error("Cannot find Nahida Skill")
        }
        const dmg = reg.Modifier(skill.Subject.CreateModifier(stats.stat.ALL_DMG, 0))
        const cr = reg.Modifier(skill.Subject.CreateModifier(stats.stat.CRIT_RATE, 0))
        let dmgC6: Modifier | undefined = undefined
        let crC6: Modifier | undefined = undefined

        function trigger() {
            if (char.GetAscension() < 4) {
                dmg.SetValue(0)
                cr.SetValue(0)
                if (dmgC6) {
                    dmgC6.SetValue(0)
                }
                if (crC6) {
                    crC6.SetValue(0)
                }
                return
            }
            const c6 = target.FindSkill("HIT_C6")
            if (c6) {
                if (!dmgC6) {
                    dmgC6 = reg.Modifier(c6.Subject.CreateModifier(stats.stat.ALL_DMG, 0))
                }
                if (!crC6) {
                    crC6 = reg.Modifier(c6.Subject.CreateModifier(stats.stat.CRIT_RATE, 0))
                }
            }

            const em = Math.max(0, char.Get(stats.stat.ELEMENTAL_MASTERY) - 200)
            const r = Math.min(0.24, em * 0.03 / 100)
            const d = Math.min(0.8, em * 0.1 / 100)
            dmg.SetValue(d)
            cr.SetValue(r)

            if (dmgC6) {
                dmgC6.SetValue(d)
            }
            if (crC6) {
                crC6.SetValue(r)
            }
        }
        trigger()

        reg.Observer(char.CreateObserver(stats.stat.ELEMENTAL_MASTERY, trigger))
        reg.Observer(char.CreateObserver(stats.stat.LEVEL, trigger))
        reg.Observer(char.CreateObserver(stats.stat.ASCENSION, trigger))

        return () => 0
    },
})