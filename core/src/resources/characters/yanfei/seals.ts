import { effect, scaling, stats } from "@src/core"

export const seals = effect.Factory({
    Name: "YanfeiSeal",
    MaxStacks: 4,
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.NORMAL_ATTACK_LEVEL, stats.stat.NORMAL_ATTACK_LEVEL_UP)
        .mv
        .Mv(stats.stat.ATK, 0.1733, "HIT_CHARGED")
        .Map((v, tg, ef) => (
            v * ef.GetStacks() * scaling.TalentScaling.ELEMENTAL_2[
            tg.GetCharacter().Get(stats.stat.NORMAL_ATTACK_LEVEL) - 1
            ]
        ))

        .Build()
})