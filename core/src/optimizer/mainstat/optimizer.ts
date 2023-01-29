import { charbox, stats } from "@src/core"
import { strings } from "@src/strings"
import { Table } from "@src/strings/table"
import { toPlaces } from "@src/utils/numbers"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Optimizer } from "../optimizer"
import { SubstatsOptimizer } from "../substats"
import { Config, Result } from "./type"


const allStats = {
    [stats.piece.FLOWER]: stats.PieceToMainstats(stats.piece.FLOWER),
    [stats.piece.PLUME]: stats.PieceToMainstats(stats.piece.PLUME),
    [stats.piece.SANDS]: stats.PieceToMainstats(stats.piece.SANDS),
    [stats.piece.GOBLET]: stats.PieceToMainstats(stats.piece.GOBLET),
    [stats.piece.CIRCLET]: stats.PieceToMainstats(stats.piece.CIRCLET),
}


export class MainstatOptimizer extends Optimizer<number[], Result, Config> {
    private results = new PriorityQueue<Result>()
    private state?: charbox.Exported
    private subsOptimizer?: SubstatsOptimizer
    private subsCombinations?: number[][]
    private initDamage = 0

    private allStats = allStats

    init(config: Config): void {
        if (config.mainstats) {
            for (const piece of stats.piece.Values()) {
                let provided = config.mainstats[piece]
                if (!provided) { continue }
                provided = provided.filter(s => allStats[piece].includes(s))
                if (provided.length === 0) { continue }
                this.allStats[piece] = provided
            }
        }
        const total = Object
            .values(this.allStats)
            .map(list => list.length)
            .reduce((a, b) => a * b, 1)

        this.setTotal(total)
        const target = this.GetTarget()
        this.state = charbox.Export(target)
        this.initDamage = this.Run()

        if (config.substats) {
            this.subsOptimizer = new SubstatsOptimizer()
            this.subsOptimizer.SetParty(this.GetParty())
            this.subsOptimizer.SetTarget(this.GetTarget())
            this.subsOptimizer.SetRotation(this.GetRotation())
            this.subsOptimizer.Init({ ...config.substats })

            this.subsCombinations = Array.from(this.subsOptimizer.Generate())
            this.state = charbox.Export(target)
        }
    }
    *Generate() {
        for (const flower of this.allStats[stats.piece.FLOWER]) {
            for (const plume of this.allStats[stats.piece.PLUME]) {
                for (const sands of this.allStats[stats.piece.SANDS]) {
                    for (const goblet of this.allStats[stats.piece.GOBLET]) {
                        for (const circlet of this.allStats[stats.piece.CIRCLET]) {
                            yield [flower, plume, sands, goblet, circlet]
                        }
                    }
                }
            }
        }
    }
    Evaluate(mainstats: number[]): Result {
        const target = this.GetTarget()
        const arts = target.GetArtifacts()
        if (!arts) {
            throw new Error("Target character has no artifacts to be optimized")
        }
        for (let i = 0; i < mainstats.length; i++) {
            arts.Get(i).SetMainstat(mainstats[i])
        }

        const result: Result = {
            damage: -1,
            mainstats,
            relative: 0
        }

        if (this.subsOptimizer && this.subsCombinations) {
            const optimizer = this.subsOptimizer
            this.subsCombinations.forEach(c => (
                optimizer.Insert(optimizer.Evaluate(c))
            ))
            const optimized = optimizer.Get()
            const top = optimized[0]
            if (top) {
                result.damage = top.damage
                result.substats = top
            }
        } else {
            result.damage = this.Run()
        }
        result.relative = result.damage / this.initDamage

        if (this.state) {
            charbox.Import(this.state, target)
        }

        return result
    }
    Insert(result: Result): void {
        if (result.damage >= 0) {
            this.results.Push(result, result.damage)
        }
    }
    Get(): Result[] {
        return this.results.Extract()
    }

    Format(results: Result[]): Table {
        const config = this.GetConfig()
        const headers = [
            stats.piece.Name(stats.piece.SANDS),
            stats.piece.Name(stats.piece.GOBLET),
            stats.piece.Name(stats.piece.CIRCLET),
        ]
        if (config.substats) {
            headers.push(
                stats.stat.Name(stats.stat.ATK),
                stats.stat.Name(stats.stat.DEF),
                stats.stat.Name(stats.stat.HP),
            )
            const subs = config.substats.substats.map(s => stats.stat.Name(s.stat))
            headers.push(...subs)
        }
        headers.push(
            strings.labels.DAMAGE,
            strings.labels.RELATIVE,
        )
        const table = new Table(...headers)

        for (const result of results) {
            const row = result.mainstats.slice(2).map(s => stats.stat.Name(s))
            if (config.substats && result.substats) {
                const sconfig = config.substats
                const sresult = result.substats
                const info: string[] = []
                sresult.stats.forEach((value, i) => {
                    const flat = stats.FlatStats.includes(sconfig.substats[i].stat)
                    const s = flat ? toPlaces(value, 0) : toPlaces(value * 100, 2) + "%"
                    info.push(s + ` (${sresult.rolls[i]})`)
                })
                const basic = sresult.basic.map(s => toPlaces(s, 0))
                row.push(...basic, ...info)
            }
            row.push(toPlaces(result.damage, 0), toPlaces(result.relative * 100, 2) + "%")
            table.AddRow(...row)
        }

        return table
    }

    EquipCmd(result: Result): string {
        const config = this.GetConfig()
        let cmd =
            "artifact add\n" +
            "artifact fill\n"

        for (const piece of [stats.piece.SANDS, stats.piece.GOBLET, stats.piece.CIRCLET]) {
            const name = stats.piece.Name(piece).toLowerCase()
            const stat = stats.stat.Name(result.mainstats[piece])
            cmd += name + " main " + stat + "\n"
        }

        if (result.substats && config.substats) {
            const subs = new SubstatsOptimizer()
            subs.SetConfig(config.substats)
            cmd += subs.EquipCmd(result.substats)
        }
        return cmd
    }

}