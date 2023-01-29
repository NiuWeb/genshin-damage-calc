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
                char.MapCritRate = x => x + royalCrit(rank, x)
            }
        }
        trigger(true)

        reg.Observer(ef.CreateObserver(effect.EffectEvent.ENABLE, () => trigger(true)))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.CHANGE_RANK, () => trigger(true)))
        reg.Observer(ef.CreateObserver(effect.EffectEvent.DISABLE, () => trigger(false)))

        return () => trigger(false)
    }
})

/** polynomial regression for Royal passive critrate scaling */
function royalCrit(rank: number, critrate: number) {
    if (critrate < -1 || critrate > 1) return 0
    const x = critrate
    const u = 0.08 + 0.02 * (rank - 1)
    const section = x < 0 ? 0 : (
        x < 1 - u ? 1 : 2
    )
    const poly = coefficients[rank - 1][section]
    const value = poly
        .map((coef, i) => (
            x < -5 * u ? 0 : ( // values lower than -5u are set to 0
                coef * x ** (poly.length - i - 1) // ax^n
            )
        ))
        .reduce((a, b) => a + b, 0) // SUM(ax^n)

    return Math.max(0, value)
}
/** polynomial regression coefficients for Royal passive critrate scaling */
const coefficients = [
    // r1
    [[-128.4499, -138.4761, -59.75334, -11.00387, -0.4655975, 0.4539864, 0.189614], // poly for x <= 0
    [-0.10036, 0.30971, -0.39967, 0.18932], // poly for 0 < x < 1 - u
    [0.86583, -1.7362, 0.87032]], // poly for x >= 1 - u
    // r2
    [[-51.0823, -67.9198, -35.7478, -8.08299, -0.414222, 0.417227, 0.211754],
    [-0.097754, 0.31144, -0.42638, 0.21147],
    [0.85002, -1.7068, 0.85672]],
    // r3
    [[-23.0139, -36.3491, -22.6081, -6.08691, -0.374257, 0.388127, 0.230281],
    [-0.092576, 0.30589, -0.44477, 0.23006],
    [0.81059, -1.6312, 0.82054]],
    // r4
    [[-12.3361, -22.796, -16.482, -5.21919, -0.421051, 0.360611, 0.246312],
    [-0.087477, 0.29824, -0.45863, 0.24612],
    [0.80621, -1.623, 0.81666]],
    // r5
    [[-6.99091, -14.7677, -12.1447, -4.39816, -0.424118, 0.340408, 0.260555],
    [-0.077554, 0.28287, -0.46728, 0.2603],
    [0.79212, -1.5973, 0.805]],
]