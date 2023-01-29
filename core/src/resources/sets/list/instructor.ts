import { artifact, effect, stats } from "@src/core"

export const Instructor = artifact.Set({
    Name: "Instructor",
    Stars: 4,
    Piece2: [
        effect.Factory({
            Name: "Instructor2",
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ELEMENTAL_MASTERY).
                Values(80).
                Build(),
        }),
    ],
    Piece4: [
        effect.Factory({
            Name: "Instructor4",
            ApplyOther: true,
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ELEMENTAL_MASTERY).
                Values(120).
                Build(),
        }),
    ],
})