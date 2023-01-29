/**
 * Damage formula for a rotation instance
 * @param noaura_noreaction damage without aura nor reaction
 * @param noaura_yesreaction damage without aura but reaction
 * @param yesaura_noreaction damage with aura but no reaction
 * @param yesaura_yesreaction damage with aura and reaction
 * @param aura aura uptime [0-1]
 * @param reaction reaction uptime [0-1]
 * @returns 
 */
export function Rotation(noaura_noreaction: number, noaura_yesreaction: number, yesaura_noreaction: number, yesaura_yesreaction: number, aura: number, reaction: number): number {
    const A = aura
    let B = 0
    if (aura > 0) {
        B = reaction / aura
    }

    let result = noaura_noreaction * (1 - A) * (1 - B)
    result += noaura_yesreaction * (1 - A) * B
    result += yesaura_noreaction * A * (1 - B)
    result += yesaura_yesreaction * A * B

    return result
}
