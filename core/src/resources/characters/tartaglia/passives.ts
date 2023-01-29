import { effect, stats } from "@src/core"

export const a0 = effect.Factory({
    Name: "TartagliaA0",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.NORMAL_ATTACK_LEVEL_UP)
        .Values(1)
        .Build()
})