import { charbox, effect } from "@src/core"

const elements = new Set<number>()
const values = [0.025, 0.05, 0.075, 0.115]

export function a4bonus(owner: charbox.Charbox): number {
    const a4 = owner.FindEffect("YunjinA4")
    if (!a4 || !a4.Enabled() || owner.GetCharacter().GetAscension() < 4) {
        return 0
    }

    const party = owner.GetParty()
    if (!party) {
        return values[0]
    }

    elements.clear()
    for (const member of party.GetMembers()) {
        const element = member.GetCharacter().Options.Element
        elements.add(element)
    }
    const n = Math.max(1, Math.min(values.length, elements.size))
    return values[n - 1]
}

export const a4 = effect.Factory({
    Name: "YunjinA4",
    OnApply(target, ef, reg) {
        const _qBonus = target.FindEffect("YunjinQ")
        if (!_qBonus) {
            throw new Error("Yunjin Burst effect not found")
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