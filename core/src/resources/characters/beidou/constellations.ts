import { effect, scaling, stats } from "@src/core"

export const c3 = effect.Factory({
    Name: "BeidouC3",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
export const c4 = effect.Factory({
    Name: "BeidouC4",
    ApplySelf: true,
    OnApply: new effect.Builder().
        instance
        .Options({
            Name: "HIT_C4",
            Element: stats.stat.ELECTRO_DMG,
            Talent: stats.stat.NONE,
            Scaling: [
                {
                    Stat: stats.stat.ATK,
                    Initial: 0.2,
                    Talent: stats.stat.NONE,
                    Scaling: scaling.TalentScaling.NONE
                }
            ]
        })
        .Build(),
})
export const c5 = effect.Factory({
    Name: "BeidouC5",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})
export const c6 = effect.Factory({
    Name: "BeidouC6",
    ApplySelf: true,
    ApplyOther: true,
    OnApply: new effect.Builder().
        stat.
        Enemy(stats.stat.ELECTRO_RES).
        Values(-0.15).
        Build(),
})