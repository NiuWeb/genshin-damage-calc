import { effect, stats } from "@src/core"
import { InstanceFilter } from "@src/core/effect/builder/instance-filter"

export const a1 = effect.Factory({
    Name: "KokomiA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.HEALING_BONUS)
        .Values(0.25)
        .Next()

        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.CRIT_RATE)
        .Values(-1)
        .Next()
        .Build()
})

export const a4 = effect.Factory({
    Name: "KokomiA4",
    OnApply(tg, _, reg) {
        const char = tg.GetCharacter()
        const qBonus = tg.FindEffect("KokomiQ")
        if (!qBonus) {
            throw new Error("Kokomi Q effect not found")
        }
        const normals = InstanceFilter(tg.GetNormals(), [/HIT_N\d/i])
        const charged = InstanceFilter(tg.GetNormals(), [/charged/i])

        const mv1 = reg.Mv({ Stat: stats.stat.HP, Value: 0, Enabled: true }, ...normals)
        const mv2 = reg.Mv({ Stat: stats.stat.HP, Value: 0, Enabled: true }, ...charged)

        const trigger = () => {
            if (!qBonus.Enabled() || char.GetAscension() < 4) {
                mv1.Value = 0
                mv2.Value = 0
            }
            const healing = char.Get(stats.stat.HEALING_BONUS)
            mv1.Value = mv2.Value = 0.15 * healing
        }
        trigger()

        reg.Observer(char.CreateObserver(stats.stat.HEALING_BONUS, trigger))
        reg.Observer(qBonus.CreateObserver(effect.EffectEvent.ENABLE, trigger))
        reg.Observer(qBonus.CreateObserver(effect.EffectEvent.DISABLE, trigger))

        return () => 0
    }
})