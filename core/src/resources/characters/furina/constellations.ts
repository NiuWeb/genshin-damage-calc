import { effect, stats } from "@src/core"
import { EffectEvent } from "@src/core/effect"



export const c1 = effect.Factory({
    Name: "FurinaC1",
    OnApply(char, ef, reg) {
        const q = char.FindEffect("FurinaQ")
        if (!q) {
            throw new Error("FurinaC1: could not find FurinaQ")
        }

        let lastValue = 0
        let lastEnabled = ef.Enabled()

        const update = () => {
            const stacks = q.GetStacks()

            if(!ef.Enabled()) {
                if(stacks > 300) {
                    lastValue = stacks
                    q.SetStacks(300)
                }
            } else {
                if(!lastEnabled && stacks < lastValue) {
                    q.SetStacks(lastValue)
                }
            }

            lastEnabled = ef.Enabled()
        }

        update()

        reg.Observer(ef.CreateObserver(EffectEvent.ENABLE, update))
        reg.Observer(ef.CreateObserver(EffectEvent.DISABLE, update))
        // limiter should work even if C1 is disabled, so won't add to registry
        q.CreateObserver(EffectEvent.CHANGE_STACKS, update)

        return () => 0
    }
})

export const c2 = effect.Factory({
    Name: "FurinaC2",
    MaxStacks: 400,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.HP_PERCENT)
        .Values(0.35 / 100)
        .Stacks()
        .Build()
})

export const c3 = effect.Factory({
    Name: "FurinaC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "FurinaC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "FurinaC6",
    Conditions: ["ARKHE_PNEUMA"],
    MaxConditions: 1,
    OnApply: new effect.Builder()
        .infusion
        .Set(stats.stat.HYDRO_DMG, true)
        .Next()

        .mv
        .Mv(stats.stat.HP, 0.18, /N\d|Charged|Plunge/i)
        .Next()

        .Where({ effect: { conditions: ["ARKHE_PNEUMA"] } })
        .mv
        .Mv(stats.stat.HP, 0.25, /N\d|Charged|Plunge/i)
        .Build()
})