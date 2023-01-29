import { artifact, effect, stats } from "@src/core"

export const NoblesseOblige = artifact.Set({
    Name: "NoblesseOblige",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "NoblesseOblige2",
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ELEMENTAL_BURST_DMG).
                Values(0.2).
                Build(),
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "NoblesseOblige4",
            ApplyOther: true,
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ATK_PERCENT).
                Values(0.2).
                Build(),
        })],
})