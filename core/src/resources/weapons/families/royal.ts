import { effect } from "@src/core"

export const Royal = (Name: string) => effect.Factory({
    Name,
    MaxRank: 5,
    OnApply(target, ef, reg) {
        const char = target.GetCharacter()

        function trigger(enabled = true) {
            if (!enabled) {
                char.MapCritRate = x => x
            } else {
                const rank = ef.GetRank()
                char.MapCritRate = x => royalCrit(rank, x)
            }
        }
        trigger(true)

        reg.Observer(ef.CreateObserver(effect.EffectEvent.ENABLE, () => trigger(true)))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_RANK, () => trigger(true)))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.DISABLE, () => trigger(false)))

        return () => trigger(false)
    }
})

/** 
 * crit rate provided by Royal Weapons.
 * Read more at:
 * https://github.com/NiuWeb/genshin-damage-calc/blob/master/notebooks/royal-weapons/royal-positive.ipynb
 */
function royalCrit(rank: number, r: number) {
    const max = Math.max
    const p = 0.08 + 0.02 * (rank - 1) // crit rate per stack per rank
    if(r < 0)
        return ((5*p + r)*max(0, r) - (5*p*r - 5*p + r**2 - r)*max(0, p + r) + (5*p**2*r - 5*p**2 + 6*p*r**2 - 11*p*r + 5*p + r**3 - 2*r**2 + r)*max(0, 2*p + r) - (10*p**3*r - 10*p**3 + 17*p**2*r**2 - 32*p**2*r + 15*p**2 + 8*p*r**3 - 21*p*r**2 + 18*p*r - 5*p + r**4 - 3*r**3 + 3*r**2 - r)*max(0, 3*p + r) + (30*p**4*r - 30*p**4 + 61*p**3*r**2 - 116*p**3*r + 55*p**3 + 41*p**2*r**3 - 112*p**2*r**2 + 101*p**2*r - 30*p**2 + 11*p*r**4 - 38*p*r**3 + 48*p*r**2 - 26*p*r + 5*p + r**5 - 4*r**4 + 6*r**3 - 4*r**2 + r)*max(0, 4*p + r) - (24*p**4*r - 24*p**4 + 50*p**3*r**2 - 100*p**3*r + 50*p**3 + 35*p**2*r**3 - 105*p**2*r**2 + 105*p**2*r - 35*p**2 + 10*p*r**4 - 40*p*r**3 + 60*p*r**2 - 40*p*r + 10*p + r**5 - 5*r**4 + 10*r**3 - 10*r**2 + 5*r - 1)*max(0, 5*p + r))/(6*p**4*r - 6*p**4 + 11*p**3*r**2 - 26*p**3*r + 15*p**3 + 6*p**2*r**3 - 24*p**2*r**2 + 33*p**2*r - 15*p**2 + p*r**4 - 6*p*r**3 + 15*p*r**2 - 20*p*r + 15*p + 1)
    else
        return (5*p + r)/(6*p**4*r - 6*p**4 + 11*p**3*r**2 - 26*p**3*r + 15*p**3 + 6*p**2*r**3 - 24*p**2*r**2 + 33*p**2*r - 15*p**2 + p*r**4 - 6*p*r**3 + 15*p*r**2 - 20*p*r + 15*p + 1)
}