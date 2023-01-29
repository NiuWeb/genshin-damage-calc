import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "HuTaoA1",
    ApplySelf: false,
    ApplyOther: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.CRIT_RATE).
        Where({ owner: { ascension: 1 } }).
        Values(0.12).
        Build(),
})

export const a4 = effect.Factory({
    Name: "HuTaoA4",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.PYRO_DMG).
        Where({ owner: { ascension: 4, hp: { leq: 0.5 } } }).
        Values(0.33).
        Build(),
})
