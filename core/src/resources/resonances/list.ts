import { Builder, Factory, Generator } from "@core/effect"
import { stat } from "@core/stats"

export const Pyro: readonly Generator[] = [
    Factory({
        Name: "ResonancePyro",
        ApplyOther: true,
        OnApply: new Builder()
            .stat
            .Char(stat.ATK_PERCENT)
            .Values(0.25)
            .Build(),
    })
]

export const Hydro: readonly Generator[] = [
    Factory({
        Name: "ResonanceHydro",
        ApplyOther: true,
        OnApply: new Builder()
            .stat
            .Char(stat.HP_PERCENT)
            .Values(0.25)
            .Build(),
    })
]

export const Cryo: readonly Generator[] = [
    Factory({
        Name: "ResonanceCryo",
        ApplyOther: true,
        OnApply: new Builder()
            .stat
            .Char(stat.EXTRA_CRIT_RATE)
            .Where({ enemy: { affected: [stat.CRYO_DMG] } })
            .Values(0.15)
            .Build(),
    })
]

export const Geo: readonly Generator[] = [
    Factory({
        Name: "ResonanceGeo",
        ApplyOther: true,
        OnApply: new Builder()
            .stat
            .Enemy(stat.GEO_RES)
            .Values(-0.15)
            .Next()

            .Where({ target: { shielded: true } })
            .stat
            .Char(stat.ALL_DMG)
            .Values(0.15)
            .Build(),
    })
]

export const Dendro: readonly Generator[] = [
    Factory({
        Name: "ResonanceDendro",
        ApplyOther: true,
        Conditions: ["BURNING", "QUICKEN", "BLOOM", "AGGRAVATE", "SPREAD", "HYPERBLOOM", "BURGEON"],
        MaxConditions: 7,
        OnApply: new Builder()
            .stat
            .Char(stat.ELEMENTAL_MASTERY)
            .Values(50)
            .Next()

            .stat
            .Char(stat.ELEMENTAL_MASTERY)
            .Values(30)
            .Where({ effect: { conditions: ["BURNING", "QUICKEN", "BLOOM"] } })
            .Next()

            .stat
            .Char(stat.ELEMENTAL_MASTERY)
            .Values(20)
            .Where({ effect: { conditions: ["AGGRAVATE", "SPREAD", "HYPERBLOOM", "BURGEON"] } })
            .Build(),
    })
]