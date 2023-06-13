import { Table } from "@src/strings/table"
import { Optimizer } from "../optimizer"
import { CombinatorCmd } from "./cmd"
import { Combination, Combinator } from "./combinator"
import { Config, Result } from "./type"

export class GeneralOptimizer extends Optimizer<Combination, Result, Config> {
    private generator: Generator<Combination> | undefined = undefined
    protected init(config: Config): void {
        const cmd = new CombinatorCmd()
        cmd.Program.CompileString(config.ConfigCmd)()
        this.generator = Combinator.Generate(...cmd.Groups())
        this.setTotal(Combinator.Count(...cmd.Groups()))
    }
    *Generate() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        yield* this.generator!
    }
    Evaluate(row: Combination): number {
        console.log(row)
        return 0
    }
    Insert(result: number): void {
        void result
    }
    Get(): number[] {
        return [0, 0]
    }
    Format(results: number[]): Table {
        void results
        throw new Error("Method not implemented.")
    }

}