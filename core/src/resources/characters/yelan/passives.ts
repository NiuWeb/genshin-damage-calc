import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "YelanA1",
    ApplySelf: true,
    OnApply: new effect.Builder().
        observe.Party(true).
        // hp% based on # of different elements on party
        stat.
        Char(stats.stat.HP_PERCENT).
        Where({ owner: { ascension: 1 } }).
        Values(0.06, 0.12, 0.18, 0.3).
        Rank((target) => {
            const party = target.GetParty()
            if (!party) {
                return 1
            }
            // count members with different elements
            const members = party.GetMembers()
            const els = new Map<number, boolean>()
            for (const member of members) {
                els.set(member.GetCharacter().Options.Element, true)
            }
            let n = 0
            for (const v of els.values()) {
                if (v) {
                    n++
                }
            }
            return n
        }).
        Build(),
})

export const a4 = effect.Factory({
    Name: "YelanA4",
    ApplySelf: true,
    ApplyOther: true,
    MaxTargets: 1,
    MaxStacks: 15,
    OnApply: new effect.Builder().
        // initial 1% dmg
        stat.
        Char(stats.stat.ALL_DMG).
        Where({ owner: { ascension: 4 } }).
        Values(0.01).
        Next().

        // stackable 3.5% dmg
        stat.
        Char(stats.stat.ALL_DMG).
        Where({ owner: { ascension: 4 } }).
        Values(0.035).
        Stacks().
        Map((x) => Math.min(0.5, x)).
        Build(),
})
