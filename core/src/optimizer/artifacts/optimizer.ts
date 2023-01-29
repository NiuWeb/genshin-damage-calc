import { SplitCases, Compiled } from "@src/cmd2"
import { artbox, artifact, scaling, stats, subject } from "@src/core"
import { CountSets } from "@src/core/artbox/count"
import { Table } from "@src/strings/table"
import { ReadOnly } from "@src/utils"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Filter } from "../filter"
import { Optimizer } from "../optimizer"
import { Config, Result, Row } from "./type"
import { FilterSets } from "./utils"

type Group = [
    index: number,
    piece: ReadOnly<artifact.Exported> | undefined
]

const mainsAndSubs = [...stats.Mainstats, ...stats.Substats]

export class ArtifactsOptimizer extends Optimizer<Row | undefined, Result | undefined, Config> {
    private compiled = new Map<string, Compiled>()
    private groups: { [piece: number]: Group[] } = []
    private mods = new Map<number, subject.Modifier>()
    private initDamage = 0
    private initSets: readonly (string | undefined)[] = []

    private queue = new PriorityQueue<Result>(5)

    protected init(config: Config): void {
        // create a copy of the original array to avoid index mutations
        config.artifacts = [...config.artifacts]

        const program = this.GetRunner().Program
        const parsed = SplitCases(config.ConfigCmd || "")

        // compile all config commands
        for (const [k, v] of parsed) {
            const cmd = "effect set " + k + "\n" + v.join("\n") + "\neffect unset"
            const compiled = program.CompileString(cmd, {
                constants: this.getConstants()
            })
            this.compiled.set(k, compiled)
        }

        // create empty groups
        for (const piece of stats.piece.Values()) {
            this.groups[piece] = []
        }

        // fill groups
        config.artifacts.forEach((art, i) => (
            this.groups[art.piece].push([i, art])
        ))

        if (this.target) {
            this.initDamage = this.Run() // calculate baseline damage
            let arts = this.target.GetArtifacts()?.GetArtifacts()

            if (!arts) {
                this.target.SetArtifacts(new artbox.Artbox(this.target))
                arts = this.target.GetArtifacts()?.GetArtifacts()
            }
            const initSets: (string | undefined)[] = []
            if (arts) {
                arts.forEach(art => { // disable artifacts that will be changed
                    if (this.groups[art.GetPiece()].length > 0) {
                        art.Disable()
                    }
                    initSets[art.GetPiece()] = art.GetSet()
                })
            }
            this.initSets = initSets

            for (const stat of mainsAndSubs) {
                this.mods.set(stat, this.target.GetCharacter().CreateModifier(stat, 0))
            }
        }

        // fill empty groups with undefined to allow combinations to be generated
        for (const piece of stats.piece.Values()) {
            if (!this.groups[piece].length) {
                this.groups[piece].push([-1, undefined])
            }
        }

        // count combinations
        let total = 1
        for (const values of Object.values(this.groups)) {
            values.sort((a, b) => (a[1]?.set || "").localeCompare(b[1]?.set || ""))
            total *= values.length
        }
        this.setTotal(total)
    }
    *Generate() {
        for (let f = 0; f < this.groups[stats.piece.FLOWER].length; f++) {
            for (let p = 0; p < this.groups[stats.piece.PLUME].length; p++) {
                for (let s = 0; s < this.groups[stats.piece.SANDS].length; s++) {
                    for (let g = 0; g < this.groups[stats.piece.GOBLET].length; g++) {
                        for (let c = 0; c < this.groups[stats.piece.CIRCLET].length; c++) {
                            yield this.Combinate([f, p, s, g, c])
                        }
                    }
                }
            }
        }
    }

    Combinate(_indexes: number[]): Row | undefined {
        const config = this.GetConfig()
        const groups = stats.piece.Values().map(piece => (
            this.groups[piece][_indexes[piece]]
        ))
        const pieces = groups.map(([, p]) => p)
        const indexes = groups.map(([i]) => i)

        const pieceSets = [...this.initSets]
        for (const piece of pieces) {
            if (!piece) { continue }
            pieceSets[piece.piece] = piece.set
        }

        const [sets, isets] = CountSets(pieceSets)

        if (!FilterSets(config, sets)) {
            return undefined
        }

        const sum: { stat: number, value: number }[] = []

        for (const _piece of pieces) {
            if (!_piece) { continue }
            const piece = _piece

            // sum mainstats
            const mainValue = scaling.GetMainstatValue(piece.stars, piece.mainstat, piece.level)
            const found = sum.find(s => s.stat === piece.mainstat)
            if (found) {
                found.value += mainValue
            } else {
                sum.push({ stat: piece.mainstat, value: mainValue })
            }

            // sum substats
            for (const { stat, value } of piece.substats) {
                const found = sum.find(s => s.stat === stat)
                if (found) {
                    found.value += value
                } else {
                    sum.push({ stat, value })
                }
            }
        }

        return {
            indexes,
            sets: isets,
            stats: sum
        }
    }

    private prevSets = ""
    private equipCmd = ""
    private configSets(arts: artbox.Artbox, sets: string[]) {
        const setNames = sets.join(";")
        if (setNames !== this.prevSets) {
            this.equipCmd = ""
            arts.Get(0).SetSet(sets[0])
            arts.Get(1).SetSet(sets[0])
            arts.Get(2).SetSet(sets[1])
            arts.Get(3).SetSet(sets[1])
            arts.Get(4).SetSet(undefined)
            for (const ef of arts.GetEffects()) {
                const config = this.compiled.get(ef.Options.Name.toLowerCase())
                if (config) {
                    config()
                    this.equipCmd += config.toString() + "\n"
                }
            }
            this.prevSets = setNames
        }
    }

    Evaluate(row: Row | undefined): Result | undefined {
        if (!row) {
            return undefined
        }
        const target = this.GetTarget()
        const arts = target.GetArtifacts()
        const { filter } = this.GetConfig()

        if (!arts) {
            throw new Error("Target has no artifacts to be optimized. Try to run `.Init()` first")
        }

        // assign stats
        for (const { stat, value } of row.stats) {
            const mod = this.mods.get(stat)
            if (!mod) {
                throw new Error("Modifier not initialized for stat " + stat + ". Try to run `.Init()` first")
            }
            mod.SetValue(value)
        }

        this.configSets(arts, row.sets)

        if (filter) {
            if (!Filter(target.GetCharacter(), ...filter)) {
                return undefined
            }
        }

        const damage = this.Run()
        const relative = damage / this.initDamage

        // clear stats
        for (const { stat } of row.stats) {
            const mod = this.mods.get(stat)
            if (!mod) {
                throw new Error("Modifier not initialized for stat " + stat + ". Try to run `.Init()` first")
            }
            mod.SetValue(0)
        }

        return {
            indexes: row.indexes,
            sets: row.sets,
            cmd: this.equipCmd,
            damage,
            relative,
        }
    }
    Insert(result: Result | undefined): void {
        if (result && result.damage > 0) {
            this.queue.Push(result, result.damage)
        }
    }
    Get(): Result[] {
        return this.queue.Extract()
    }
    Format(): Table {
        throw new Error("Method not implemented.")
    }

    /** gets the artifacts used in a combination */
    GetArtifacts({ indexes }: Result): ReadOnly<artifact.Exported[]> {
        const { artifacts } = this.GetConfig()
        return indexes
            .filter(i => i >= 0)
            .map(i => artifacts[i])
    }
}