import { charbox, effect, scaling, stats } from "@src/core"
import { Modifier } from "@src/core/subject"
import { strings } from "@src/strings"

export const qBonus = effect.Factory({
    Name: "NahidaQ",
    OnApply(target, ef, reg) {
        const skill = target.FindSkill(strings.hits.HIT_E_DOT)
        if (!skill) {
            throw new Error("Cannot find Nahida Skill")
        }
        const mod = reg.Modifier(skill.Subject.CreateModifier(stats.stat.ALL_DMG, 0))
        let modC6: Modifier | undefined = undefined

        function trigger() {
            const party = target.GetParty()
            if (!party) {
                mod.SetValue(0)
                if (modC6) {
                    modC6.SetValue(0)
                }
                return
            }
            const c6 = target.FindSkill("HIT_C6")
            if (c6 && !modC6) {
                modC6 = reg.Modifier(c6.Subject.CreateModifier(stats.stat.ALL_DMG, 0))
            }

            const c1 = target.FindEffect("NahidaC1")
            const plus = c1 && c1.Enabled() && c1.GetTargets().includes(target)

            let pyros = plus ? 1 : 0
            for (const member of party.GetMembers()) {
                if (member.GetCharacter().Options.Element === stats.stat.PYRO_DMG) {
                    pyros++
                }
            }
            let init = 0
            if (pyros >= 1) {
                init = 0.1488
            }
            if (pyros >= 2) {
                init = 0.2232
            }

            const value = init * scaling.TalentScaling.ELEMENTAL_1[
                target.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL) - 1
            ]
            mod.SetValue(value)
            if (modC6) {
                modC6.SetValue(value)
            }
        }
        trigger()

        reg.Observer(ef.CreateObserver(effect.EffectEvent.ENABLE, trigger))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.DISABLE, trigger))
        reg.Observer(target.GetCharacter().CreateObserver(stats.stat.ELEMENTAL_BURST_LEVEL, trigger))
        reg.Observer(target.GetCharacter().CreateObserver(stats.stat.ELEMENTAL_BURST_LEVEL_UP, trigger))
        reg.Observer(target.Event.CreateObserver(charbox.CharboxEvent.CHANGE_PARTY, trigger))

        return () => 0
    },
})