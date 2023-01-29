import { effect, stats, scaling } from "@src/core"

export const FrostBurial = (Name: string, instanceName: string) => effect.Factory({
    Name,
    MaxRank: 5,
    OnApply: new effect.Builder()
        .instance
        .Options({
            Name: instanceName,
            Element: stats.stat.PHYSICAL_DMG,
            Talent: stats.stat.NONE,
            Scaling: [{
                Initial: 0,
                Stat: stats.stat.NONE,
                Talent: stats.stat.NONE,
                Scaling: scaling.TalentScaling.NONE,
            }]
        })
        .Next()

        .Where({ not: true, enemy: { affected: [stats.stat.CRYO_DMG] } })
        .mv
        .Mv(stats.stat.ATK, 0.8, instanceName)
        .Map((_, __, ef) => (
            [0.8, 0.95, 1.1, 1.25, 1.4][ef.GetRank() - 1]
        ))
        .Next()

        .Where({ enemy: { affected: [stats.stat.CRYO_DMG] } })
        .mv
        .Mv(stats.stat.ATK, 2, instanceName)
        .Map((_, __, ef) => (
            [2, 2.4, 2.8, 3.2, 3.6][ef.GetRank() - 1]
        ))

        .Build()
})