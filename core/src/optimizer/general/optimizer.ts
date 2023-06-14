import { Constants } from "@src/cmd2"
import { Exported, Export, Import } from "@src/core/charbox"
import { Table } from "@src/strings/table"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Optimizer } from "../optimizer"
import { CombinatorCmd } from "./cmd"
import { Combination, Combinator, equipCombinationCmd } from "./combinator"
import { Config, Result } from "./type"

export class GeneralOptimizer extends Optimizer<Combination, Result, Config> {
    private generator: Generator<Combination> | undefined = undefined
    private constants: Constants = {}

    private initDamage = 0
    private initState?: Exported

    private results = new PriorityQueue<Result>()

    protected init(config: Config): void {
        const cmd = new CombinatorCmd()
        this.constants = this.getConstants()
        cmd.Program.CompileString(config.ConfigCmd, {
            constants: this.constants
        })()
        this.generator = Combinator.Generate(...cmd.Groups())
        this.setTotal(Combinator.Count(...cmd.Groups()))

        if (this.target) {
            this.initState = Export(this.target)
            this.initDamage = this.Run()
        }
    }
    *Generate() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        yield* this.generator!
    }
    Evaluate(combination: Combination): Result {
        const runner = this.GetRunner()
        const target = this.GetTarget()
        runner.Scenario.Character = target

        const cmd = equipCombinationCmd(combination)
        const config = runner.Program.CompileString(cmd, this.constants)
        config()

        if (combination.artifact.substats) {
            void "optimize substats"
        }

        const damage = this.Run()
        const relative = damage / this.initDamage

        if (combination.artifact.substats) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            Import(this.initState!, target)
        }

        return { combination, damage, relative }
    }
    Insert(result: Result): void {
        this.results.Push(result, result.damage)
    }
    Get(): Result[] {
        return this.results.Extract()
    }
    Format(results: Result[]): Table {
        void results
        throw new Error("Method not implemented.")
    }

}