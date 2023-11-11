import { charbox, effect, scaling, stats } from "@src/core"
import { CharboxEvent } from "@src/core/charbox"
import { Observer } from "@src/core/subject"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0786,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_1,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0596,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_2,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0323,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_3,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0829,
            },
        ],
    },
]

export const eBouns = effect.Factory({
    Name: "FurinaE",
    OnApply(char, ef, reg) {
        // extend the built effect to include party members
        // hp changes to the observers

        const update = builder(char, ef, reg)
        const observers: Observer[] = []

        const updateParty = () => {
            // when party changes, remove all observers
            for (const observer of observers) {
                reg.RemoveObserver(observer)
            }

            // get the new party members
            let members: readonly charbox.Charbox[] = []
            const party = char.GetParty()
            if (party) {
                members = party.GetMembers()
            }

            // and create new observers
            for (const member of members) {
                if (member === char) {
                    continue
                }

                const observer = reg.Observer(
                    member.GetCharacter().CreateObserver(stats.stat.HP_CURRENT, update)
                )

                observers.push(observer)
            }
        }

        reg.Observer(char.Event.CreateObserver(CharboxEvent.CHANGE_PARTY, updateParty))
        updateParty()

        return () => 0
    }
})

// base DMG bonus based on # of characters with >50% HP
const builder = new effect.Builder()
    .observe.Party(true)
    .observe.Target(stats.stat.HP_CURRENT)
    .mv
    .Multiplier(1, /E_\d/)
    .Map((_, char) => {
        // find all party members
        let members: readonly charbox.Charbox[] = []
        const party = char.GetParty()
        if (!party) {
            members = [char]
        } else {
            members = party.GetMembers()
        }

        // count the number of members with >50% HP
        let stacks = 0
        for (const member of members) {
            const hp = member.GetCharacter().Get(stats.stat.HP_CURRENT)
            if (hp > 0.5) {
                stacks++
            }
        }

        stacks = Math.min(stacks, 4)
        return 1 + stacks / 10
    })
    .Build()