import { ExportParty, ImportParty, ExportedParty } from "@src/core/charbox"
import { Table } from "@src/strings/table"
import { PriorityQueue } from "@src/utils/priority/queue"
import { GetThreadType, THREAD_TYPE } from "@src/worker/actions/optimizer/config"
import { Optimizer } from "../optimizer"
import { SubstatsOptimizer, Result as SubstatsResult } from "../substats"
import { CombinatorCmd } from "./cmd"
import { Combination, Combinator, equipCombinationCmd } from "./combinator"
import { formatResults } from "./format"
import { Config, Result } from "./type"

export class GeneralOptimizer extends Optimizer<Combination, Result | undefined, Config> {
    private generator: Generator<Combination> | undefined = undefined

    private initDamage = 0
    private initState?: ExportedParty

    private results = new PriorityQueue<Result>()

    protected init(config: Config): void {
        const constants = this.getConstants()

        const cmd = new CombinatorCmd(this.target?.GetCharacter().Options.Weapon)
        cmd.Program.Log = new Logger()
        cmd.Program.Log.Out = () => void 0


        cmd.Program.CompileString(config.ConfigCmd, {
            constants: this.constants
        })()

        this.generator = Combinator.Generate(...cmd.Groups())
        this.setTotal(Combinator.Count(...cmd.Groups()))

        if (this.party) {
            this.initState = ExportParty(this.party)
            this.initDamage = this.Run()
        }

        if (GetThreadType() === THREAD_TYPE.MAIN_WORKER) {
            console.log("[MAIN WORKER INIT LOG]\n" + cmd.Program.Log)
        }
    }
    *Generate() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        yield* this.generator!
    }
    Evaluate(combination: Combination): Result | undefined {
        const runner = this.GetRunner()
        const target = this.GetTarget()
        runner.Scenario.Character = target

        let cmd = equipCombinationCmd(combination)
        const config = runner.compileString(cmd, this.constants)
        config()

        let damage = 0
        let substats: SubstatsResult | undefined = undefined
        if (combination.artifact.substats) {
            const subsOptimizer = new SubstatsOptimizer()
            subsOptimizer.SetParty(this.GetParty())
            subsOptimizer.SetTarget(this.GetTarget())
            subsOptimizer.SetRotation(this.GetRotation())
            subsOptimizer.Init({ ...combination.artifact.substats })
            for (const combi of subsOptimizer.Generate()) {
                subsOptimizer.Insert(subsOptimizer.Evaluate(combi))
            }
            substats = subsOptimizer.Get()[0]
            if (!substats) {
                subsOptimizer.Clear()
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImportParty(this.initState!, this.party!)

                return undefined
            }
            damage = substats.damage
            cmd += "\n" + subsOptimizer.EquipCmd(substats)

            subsOptimizer.Clear()
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ImportParty(this.initState!, this.party!)
        } else {
            damage = this.Run()
        }

        const relative = damage / this.initDamage

        return { cmd, combination, substats, damage, relative }
    }
    Insert(result: Result | undefined): void {
        if (!result) {
            return
        }
        this.results.Push(result, result.damage)
    }
    Get(): Result[] {
        return this.results.Extract()
    }
    Format(results: Result[]): Table {
        return GeneralOptimizer.Format(results)
    }

    static Format(results: (Result | undefined)[]): Table {
        const filtered = results.filter(result => result !== undefined) as Result[]
        return formatResults(filtered)
    }
}