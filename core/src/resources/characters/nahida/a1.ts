import { charbox, effect, stats } from "@src/core"
import { Character } from "@src/core/character"
import { Observer } from "@src/core/subject"

export const a1 = effect.Factory({
    Name: "NahidaA1",
    ApplyOther: true,
    MaxTargets: 1,
    OnApply(target, ef, reg) {
        const tgchar = target.GetCharacter()
        const owchar = ef.Owner.GetCharacter()
        const mod = reg.Modifier(tgchar.CreateModifier(stats.stat.ELEMENTAL_MASTERY, 0))

        let targets: Character[] = []
        const emObs: Observer[] = []

        function trigger(reason?: unknown) {
            if (reason === mod) {// avoid infinite loop by self-updating
                return
            }
            if (owchar.Get(stats.stat.ASCENSION) < 1) { // constraint to A1
                mod.SetValue(0)
                return
            }
            let maxValue = 0
            let maxTarget: Character = tgchar

            for (const tg of targets) {
                const em = tg.Get(stats.stat.ELEMENTAL_MASTERY)
                if (em > maxValue) {
                    maxValue = em
                    maxTarget = tg
                }
            }

            if (maxTarget === tgchar) {
                maxValue -= mod.GetValue()
            }

            const value = Math.min(250, Math.max(0, 0.25 * maxValue))
            mod.SetValue(value)
        }

        function observeParty() {
            // remove all previous observers
            emObs.forEach(obs => obs.Remove())
            const party = target.GetParty()
            if (!party) {
                targets = [tgchar]
            } else {
                targets = []
                for (const member of party.GetMembers()) {
                    targets.push(member.GetCharacter())
                }
            }
            for (const tg of targets) {
                emObs.push(
                    reg.Observer(tg.CreateObserver(stats.stat.ELEMENTAL_MASTERY, trigger))
                )
            }
            trigger()
        }
        observeParty()

        reg.Observer(target.Event.CreateObserver(charbox.CharboxEvent.CHANGE_PARTY, observeParty))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.ENABLE, observeParty))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.DISABLE, observeParty))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_CONDITIONS, observeParty))
        reg.Observer(owchar.CreateObserver(stats.stat.LEVEL, trigger))
        reg.Observer(owchar.CreateObserver(stats.stat.ASCENSION, trigger))

        return () => 0
    },
})