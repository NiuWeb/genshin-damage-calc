import { effect, stats } from "@src/core"

const c2builder = new effect.Builder()
    .stat
    .Char(stats.stat.CRIT_RATE)
    .Instance("HIT_E")
    .Values(0.12)
    .Map((val, char) => {
        const e = char.FindEffect("NaviaE")
        if (!e) throw new Error("NaviaE not found")

        const stacks = Math.min(e.GetStacks(), 3)
        return val * stacks
    })
    .Build()

export const c2 = effect.Factory({
    Name: "NaviaC2",
    OnApply(char, ef, reg) {
        const caller = c2builder(char, ef, reg)

        const e = char.FindEffect("NaviaE")
        if (!e) throw new Error("NaviaE not found")

        reg.Observer(e.CreateObserver(effect.EffectEvent.CHANGE_STACKS, caller))

        return caller
    }
})

export const c3 = effect.Factory({
    Name: "NaviaC3",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .Values(3)
        .Build()
})

export const c4 = effect.Factory({
    Name: "NaviaC4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Enemy(stats.stat.GEO_RES)
        .Values(-0.2)
        .Build()
})

export const c5 = effect.Factory({
    Name: "NaviaC5",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .Values(3)
        .Build()
})

const c6builder = new effect.Builder()
    .stat
    .Char(stats.stat.CRIT_DMG)
    .Instance("HIT_E")
    .Values(0.45)
    .Map((val, char) => {
        const e = char.FindEffect("NaviaE")
        if (!e) throw new Error("NaviaE not found")

        const stacks = Math.max(0, Math.min(e.GetStacks() - 3, 3))
        return val * stacks
    })
    .Build()

export const c6 = effect.Factory({
    Name: "NaviaC6",
    OnApply(char, ef, reg) {
        const caller = c6builder(char, ef, reg)

        const e = char.FindEffect("NaviaE")
        if (!e) throw new Error("NaviaE not found")

        reg.Observer(e.CreateObserver(effect.EffectEvent.CHANGE_STACKS, caller))

        return caller
    }
})