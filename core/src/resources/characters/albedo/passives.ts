import { effect, stats } from "@src/core"
import { strings } from "@src/strings"

export const a1 = effect.Factory({
    Name: "AlbedoA1",
    OnApply(target, _, reg) {
        const char = target.GetCharacter()
        const skill = target.FindSkill(strings.hits.HIT_E_DOT)
        if (!skill) {
            throw new Error("Cannot find Albedo Skill")
        }
        const mod = reg.Modifier(skill.Subject.CreateModifier(stats.stat.ALL_DMG, 0))

        function trigger() {
            if (char.GetAscension() >= 1) {
                mod.SetValue(0.25)
            } else {
                mod.SetValue(0)
            }
        }
        trigger()

        reg.Observer(char.CreateObserver(stats.stat.LEVEL, trigger))
        reg.Observer(char.CreateObserver(stats.stat.ASCENSION, trigger))

        return () => 0
    }
})

export const a4 = effect.Factory({
    Name: "AlbedoA4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 4 } })
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Values(125)
        .Build()
})