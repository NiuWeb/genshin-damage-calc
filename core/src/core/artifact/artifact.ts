import { PieceToMainstats, stat, Substats } from "@core/stats"
import { Modifier, Observer, Subject } from "@core/subject"
import { GetMainstatValue, GetSubstatMax, GetSubstatValue } from "@core/scaling"
import { ArtifactEvent } from "./events"
import type { Character } from "@core/character"
import { FormatRolls, CountRolls } from "./rolls/count"

interface ArtifactStat {
    Stat: number
    Value: number
}
/** simple id counter */
let idcounter = 0
/** A single artifact that can be equipped to a character */
export class Artifact {
    constructor(
        /** artifact piece (flower, plume, etc.) */
        private piece: number
    ) {
        this.mainstat = PieceToMainstats(piece)[0]
    }
    /** Is the artifact locked? */
    Locked = false
    /** A number that identifies the artifact */
    Id = idcounter++
    /** artifact events */
    readonly Event = new Subject(ArtifactEvent.Length(), "ARTIFACT_EVENT")
    /** is the artifact enabled */
    private enabled = true
    /** artifact stars */
    private stars = 4
    /** artifact set name */
    private set: string | undefined
    /** character level [0-20] */
    private level = 0
    /** character mainstat */
    private mainstat: number
    /** character substats */
    private substats: ArtifactStat[] = []

    /** character that equips the artifact */
    private character?: Character
    private modifiers: Modifier[] = []
    private observers: Observer[] = []

    /** Gets the artifact piece */
    GetPiece(): number {
        return this.piece
    }

    /** Gets the artifact level */
    GetLevel(): number {
        return this.level
    }
    /** Sets the artifact level */
    SetLevel(level: number): Artifact {
        if (this.stars === 4) {
            level = Math.min(16, level)
        } else if (this.stars === 5) {
            level = Math.min(20, level)
        }
        if (level < 0) level = 0
        this.level = Math.floor(level)
        this.Event.Notify(ArtifactEvent.CHANGE_LEVEL)
        this.Event.Notify(ArtifactEvent.CHANGE_MAINSTAT)
        return this
    }

    /** Gets the artifact stars */
    GetStars(): number {
        return this.stars
    }
    /** Sets the artifact stars */
    SetStars(stars: number): Artifact {
        if (stars === 4) {
            if (this.GetLevel() > 16) {
                this.SetLevel(16)
            }
        } else if (stars === 5) {
            if (this.GetLevel() > 20) {
                this.SetLevel(20)
            }
        } else {
            throw new Error("Artifact stars must be 4 or 5")
        }
        this.stars = stars
        this.Event.Notify(ArtifactEvent.CHANGE_STARS)
        this.Event.Notify(ArtifactEvent.CHANGE_MAINSTAT)
        return this
    }

    /** Gets the artifact's mainstat */
    GetMainstat(): number {
        return this.mainstat
    }
    /** Sets the artifact's mainstat */
    SetMainstat(mainstat: number): Artifact {
        const valid = PieceToMainstats(this.piece)
        if (valid.includes(mainstat)) {
            // replace repeated substats
            const repeatedSub = this.substats.findIndex(sub => sub.Stat === mainstat)
            // substats that can be equipped
            const available = Substats
                .filter(sub => (
                    !this.substats.find((s, i) => (
                        // cannot be in any other substat
                        i !== repeatedSub && s.Stat === sub
                    ))
                ))
            // the stat to replace the repeated substat
            const newSub = available.includes(this.mainstat) ? this.mainstat : available[0]
            this.mainstat = mainstat
            if (repeatedSub !== -1 && newSub) {
                this.SetSubstat(repeatedSub, newSub)
            }
            this.Event.Notify(ArtifactEvent.CHANGE_MAINSTAT)
        }
        return this
    }
    /** Gets the artifact's mainstat value */
    GetMainstatValue(): number {
        if (!this.enabled) {
            return 0
        }
        return GetMainstatValue(this.stars, this.mainstat, this.level)
    }

    /** Gets the artifact set */
    GetSet(): string | undefined {
        return this.set
    }
    /** Sets the artifact set */
    SetSet(name: string | undefined): Artifact {
        this.set = name
        this.Event.Notify(ArtifactEvent.CHANGE_SET)
        return this
    }

    /** gets the number of substats in the artifact */
    SubstatsLength(): number {
        return this.substats.length
    }

    /** 
     * Adds a new substat to the artifact. It will not be added
     * if there're already 4 substat in the artifact, if the
     * new substat is the same as the mainstat, or if there're
     * is already another substat with the same stat.
     * 
     * @returns if the substat has been added or not.
    */
    AddSubstat(sub: number, value: number): boolean {
        if (this.substats.length === 4) {
            return false
        }
        if (!Substats.includes(sub)) {
            return false
        }
        const existing = [this.mainstat, ...this.substats.map(sub => sub.Stat)]
        if (existing.includes(sub)) {
            return false
        }
        const max = GetSubstatMax(this.stars, sub)
        value = Math.max(0, Math.min(max, value))
        this.substats.push({ Stat: sub, Value: value })
        this.Event.Notify(ArtifactEvent.CHANGE_SUBSTAT)
        return true
    }

    /** Gets the substat in the given position */
    GetSubstat(pos: number): number {
        return this.substats[pos].Stat
    }
    /**
     * Sets the stat of the substat in the given position.
     * It won't be changed if the stat is the same as the mainstat.
     * If another substat has already the same stat, it will be swapped both stats and values.
    */
    SetSubstat(pos: number, sub: number): boolean {
        if (this.mainstat === sub) {
            return false
        }
        if (!Substats.includes(sub)) {
            return false
        }
        // find another substat with the same stat that we want to change
        const swap = this.substats.findIndex((s, i) => i !== pos && s.Stat === sub)

        const previousRoll = GetSubstatValue(this.stars, this.substats[pos].Stat, 1)
        const newRoll = GetSubstatValue(this.stars, sub, 1)

        // make the swap
        if (swap > -1) {
            // swap stat
            this.substats[swap].Stat = this.substats[pos].Stat
            // swap value
            this.substats[swap].Value *= previousRoll / newRoll
        }
        this.substats[pos].Stat = sub
        this.substats[pos].Value *= newRoll / previousRoll

        this.Event.Notify(ArtifactEvent.CHANGE_SUBSTAT)
        return true
    }

    /** Gets the substat value */
    GetSubstatValue(pos: number): number {
        if (!this.enabled) {
            return 0
        }
        return this.substats[pos].Value
    }
    /** Sets the substat value */
    SetSubstatValue(pos: number, value: number): Artifact {
        const max = GetSubstatMax(this.stars, this.substats[pos].Stat)
        value = Math.max(0, Math.min(max, value))
        this.substats[pos].Value = value
        this.Event.Notify(ArtifactEvent.CHANGE_SUBSTAT)
        return this
    }

    /** Sets all substats to 0 */
    ClearSubstats(): Artifact {
        this.substats.forEach(sub => sub.Value = 0)
        this.Event.Notify(ArtifactEvent.CHANGE_SUBSTAT)
        return this
    }

    /** Adds 4 different substats */
    FillSubstats(): Artifact {
        const subs = Substats.filter(s => s !== this.GetMainstat())
        for (let i = 0; i < subs.length; i++) {
            this.AddSubstat(subs[i], 0)
        }
        return this
    }

    /** Finds the index of a substat by its stat */
    FindSubstat(stat: number): number {
        return this.substats.findIndex(sub => sub.Stat === stat)
    }

    /** Enables the artifact  */
    Enable(): Artifact {
        this.enabled = true
        this.Event.Notify(ArtifactEvent.CHANGE_MAINSTAT)
        this.Event.Notify(ArtifactEvent.CHANGE_SUBSTAT)
        return this
    }
    /** Disables the artifact  */
    Disable(): Artifact {
        this.enabled = false
        this.Event.Notify(ArtifactEvent.CHANGE_MAINSTAT)
        this.Event.Notify(ArtifactEvent.CHANGE_SUBSTAT)
        return this
    }

    /** Checks if the artifact is enabled */
    Enabled(): boolean {
        return this.enabled
    }

    /** Unequips this artifact from its character */
    Unequip(): Artifact {
        this.character = undefined
        this.modifiers.forEach(mod => mod.Disable())
        this.observers.forEach(mod => mod.Remove())
        this.modifiers = []
        this.observers = []
        return this
    }

    /** 
     * Equips the artifact to a character.
     * If a character already has the artifact equipped, it will be
     * unequipped first.
     */
    Equip(character: Character): Artifact {
        if (this.character) {
            this.Unequip()
        }
        this.character = character

        const mainMod = character.CreateModifier(this.mainstat, this.GetMainstatValue())
        const mainObs = this.Event.CreateObserver(ArtifactEvent.CHANGE_MAINSTAT, () => {
            mainMod.SetProp(this.mainstat)
            mainMod.SetValue(this.GetMainstatValue())
        })

        const subMods: Modifier[] = []
        for (let i = 0; i < 4; i++) {
            subMods.push(character.CreateModifier(stat.ATK_FLAT, 0))
        }
        const subObs = this.Event.CreateObserver(ArtifactEvent.CHANGE_SUBSTAT, () => {
            for (let i = 0; i < 4; i++) {
                if (i < this.SubstatsLength()) {
                    subMods[i].SetProp(this.GetSubstat(i))
                    subMods[i].SetValue(this.GetSubstatValue(i))
                } else {
                    subMods[i].SetValue(0)
                }
            }
        })
        subObs.Notify()

        this.modifiers = [mainMod, ...subMods]
        this.observers = [mainObs, subObs]

        return this
    }

    /** 
     * Calculates the artifact rolls.
     * NOTE: It will recalculate the rolls on each call.
     * The result is an array of pairs `[stat, [tier 0, tier 1, tier 2, tier 3]]`.
     */
    Rolls(mode: Parameters<typeof CountRolls>[1] = "auto") {
        const substats = this.substats.map(sv => [sv.Stat, sv.Value] as [number, number])
        const rolls = CountRolls({
            level: this.GetLevel(),
            stars: this.GetStars(),
            substats,
        }, mode)
        return rolls
    }

    /** 
     * Calculates the artifact rolls, formatted.
     * NOTE: It will recalculate the rolls on each call.
     */
    FormatRolls() {
        return FormatRolls(this.GetStars(), this.Rolls())
    }
}