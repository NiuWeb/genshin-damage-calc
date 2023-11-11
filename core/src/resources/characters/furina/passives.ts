import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "FurinaA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .observe.Target(stats.stat.HP, stats.stat.HP_BASE, stats.stat.HP_PERCENT, stats.stat.HP_FLAT)
        .stat
        .Char(stats.stat.ALL_DMG)
        .Instance(/E_\d/)
        .Values(0.7 / 100)
        .Map((x, char) => (
            Math.min(0.28, x * char.GetCharacter().Get(stats.stat.HP) / 1000)
        ))
        .Build()
})

/*

Every 1,000 points of Furina's Max HP can buff the different Arkhe-aligned Salon Solitaire in the following ways:
Will increase Salon Member DMG dealt by 0.7%, up to a maximum of 28%.
Will decrease active character healing interval of the Singer of Many Waters by 0.4%, up to a maximum of 16%.

*/