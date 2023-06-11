export interface Weapon {
    name: string
    rank: number
}

export interface Artifacts {
    sands: string
    goblet: string
    circlet: string
}

export interface Combination {
    weapon: Weapon
    artifact: Artifacts
}