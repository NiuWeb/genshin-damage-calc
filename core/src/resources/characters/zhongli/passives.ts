import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "ZhongliA4",
    ApplySelf: true,
    OnApply: new effect.Builder().
        Where({ target: { ascension: 4 } }).
        mv.
        Mv(stats.stat.HP, 0.0139, /HIT_(N(\d)|CHARGED|PLUNGE)/).
        Next().

        Where({ target: { ascension: 4 } }).
        mv.
        Mv(stats.stat.HP, 0.019, /HIT_E/).
        Next().

        Where({ target: { ascension: 4 } }).
        mv.
        Mv(stats.stat.HP, 0.33, /HIT_Q/).
        Build(),
})