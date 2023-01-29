import { effect, scaling, stats, weapon } from "@src/core"

export const StaffOfHoma = weapon.Factory({
    Name: "StaffOfHoma",
    Type: stats.weapon.POLEARM,
    Stars: 5,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.CRIT_DMG,
    Effects: [
        effect.Factory({
            Name: "StaffOfHoma1",
            ApplySelf: true,
            MaxRank: 5,
            OnApply: new effect.Builder().
                stat.
                // Basic HP% bonus
                Char(stats.stat.HP_PERCENT).
                Values(0.2, 0.25, 0.3, 0.35, 0.4).
                Next().

                // ATK flat based on HP
                // Observe hp changes
                observe.Target(
                    stats.stat.HP_BASE,
                    stats.stat.HP_PERCENT,
                    stats.stat.HP_FLAT,
                ).
                stat.
                Char(stats.stat.ATK_FLAT).
                Values(0.008, 0.010, 0.012, 0.014, 0.016).
                Map((x, target) => (
                    target.GetCharacter().Get(stats.stat.HP) * x
                )).
                Next().

                // ATK flat based on HP when low hp
                // Observe hp changes
                observe.Target(
                    stats.stat.HP_BASE,
                    stats.stat.HP_PERCENT,
                    stats.stat.HP_FLAT,
                ).
                stat.
                Char(stats.stat.ATK_FLAT).
                Where({ target: { hp: { leq: 0.5 } } }).
                Values(0.010, 0.012, 0.014, 0.016, 0.018).
                Map((x, target) => (
                    target.GetCharacter().Get(stats.stat.HP) * x
                )).
                Build(),
        }),
    ],
})