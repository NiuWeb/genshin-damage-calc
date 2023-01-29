import { effect, stats } from "@src/core"

export const DesertPavilion = (Name: string, stat: number, values: readonly number[]) => effect.Factory({
    Name,
    ApplyOther: true,
    StackSelf: true,
    MaxRank: 5,
    OnApply(target, ef, reg) {
        const ownerChar = ef.Owner.GetCharacter()
        const targetChar = target.GetCharacter()
        const mod = reg.Modifier(targetChar.CreateModifier(stat, 0))
        function trigger() {
            const em = ownerChar.Get(stats.stat.ELEMENTAL_MASTERY)
            let val = values[ef.GetRank() - 1] * em
            if (ownerChar !== targetChar) {
                val *= 0.3
            }
            mod.SetValue(val)
        }
        trigger()

        reg.Observer(ownerChar.CreateObserver(stats.stat.ELEMENTAL_MASTERY, trigger))

        return () => 0
    }
})