import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "XingqiuA4",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.HYDRO_DMG).
        Where({ owner: { ascension: 4 } }).
        Values(0.2).
        Build(),
})