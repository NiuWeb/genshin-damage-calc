import { Constants } from "@src/cmd2"
import { charbox, rotation, stats } from "@src/core"
import { Runner } from "@src/runner"
import { store } from "@src/store"
import { Table } from "@src/strings/table"
import type { OptimizerConfig } from "./type"

/**
 * Template for an optimizer class
 * @template Row the value of a single row generated, 
 * a single "combination" for the optimizer to evaluate
 * @template Result the value resulting of evaluating a row
 */
export abstract class Optimizer<Row, Result, Config extends OptimizerConfig, Message = Row> {
    /**
     * Maximum number of rows to be grouped in a single chunk
     * to be evaluated in parallel. Set to `Infinity` to allow
     * any number of rows to be grouped.
     */
    public readonly MAX_CHUNK_SIZE = Infinity

    /**
     * Maximum number of child workers to spawn. Set to `Infinity`
     * to allow any number of child workers to be spawned.
     */
    public readonly MAX_CHILDREN = Infinity

    /** Optimizer configuration */
    protected config?: Config
    protected runner?: Runner
    protected target?: charbox.Charbox
    protected party?: charbox.Party
    protected rotation?: rotation.Rotation
    protected total = 0

    /** changes the optimizer config without initializing */
    SetConfig(config: Config): void {
        this.config = config
    }

    /** Sets the optimizer target */
    SetTarget(target: charbox.Charbox): void {
        this.target = target
    }
    /** Sets the optimizer party */
    SetParty(party: charbox.Party): void {
        this.party = party
    }
    /** sets the optimizer rotation */
    SetRotation(rotation: rotation.Rotation): void {
        this.rotation = rotation
    }

    /** Initializes the optimizer */
    Init(config: Config): void {
        this.config = config
        this.runner = new Runner()
        const scenario = this.runner.Scenario
        if (config.Party) {
            scenario.Party = store.PartyFrom(config.Party)
            this.party = scenario.Party
        }
        if (config.Cmd) {
            this.runner.Program.CompileString(config.Cmd)()
            this.rotation = scenario.Rotation
            this.rotation.Log = undefined // disable rotation logs
        }
        if (config.Target) {
            this.runner.Program.Compile(["character", "set", config.Target])()
            this.target = scenario.Character
        }

        this.init(config)
    }
    /** initializes the optimizer (internal) */
    protected abstract init(config: Config): void

    /** Sets the total rows to be generated. Use 0 or -1 if total rows are unknown */
    protected setTotal(total: number): void {
        this.total = total
    }
    /** Gets the total rows to be generated. Returns 0 or -1 if total rows are unknown */
    GetTotal(): number {
        return this.total
    }

    /** Gets the optimizer current config. Throws an error if no config defined */
    GetConfig(): Config {
        if (!this.config) {
            throw new Error("Configuration not set for this optimizer. Try to run `.Init()` first")
        }
        return this.config
    }
    /** Gets the optimizer configured party */
    GetParty(): charbox.Party {
        if (!this.party) {
            throw new Error("Party not set for this optimizer. Try to run `.Init()` first")
        }
        return this.party
    }
    /** Gets the selected target character in the optimizer */
    GetTarget(): charbox.Charbox {
        if (!this.target) {
            throw new Error("Target character not set for this optimizer. Try to run `.Init()` first")
        }
        return this.target
    }
    /** gets the optimizer current rotation */
    GetRotation(): rotation.Rotation {
        if (!this.rotation) {
            throw new Error("Rotation not set for this optimizer. Try to run `.Init()` first")
        }
        return this.rotation
    }

    /** gets the optimizer command runer */
    GetRunner(): Runner {
        if (!this.runner) {
            throw new Error("Runner not set for this optimizer. Try to run `.Init()` first")
        }
        return this.runner
    }

    /** Runs the objective function of the rotation */
    Run(): number {
        if (!this.rotation) {
            throw new Error("Rotation not set for this optimizer. Try to run `.Init()` first")
        }
        const state = charbox.ExportParty(this.GetParty())
        this.rotation.SetCharacters(...this.GetParty().GetMembers())
        const result = this.rotation.Run()
        charbox.ImportParty(state, this.GetParty())
        return result
    }

    /** Generates a single combination to ve evaluated */
    abstract Generate(): Generator<Row>
    /** Evaluates a single generated combination */
    abstract Evaluate(row: Row): Result
    /** Inserts the result of an evaluated combination to the optimizer pool */
    abstract Insert(result: Result): void
    /** Gets all the inserted and sorted evaluated combinations */
    abstract Get(): Result[]
    /** Converts an array of results to a formatted table */
    abstract Format(results: Result[]): Table
    /** Generates, evaluates and inserts all the combinations in a single step */
    Optimize(): Result[] {
        for (const row of this.Generate()) {
            this.Insert(this.Evaluate(row))
        }
        return this.Get()
    }

    /**
     * This method is designed for worker-distributed optimizers, where a 
     * parent worker generates combinations and multiple child workers 
     * evaluate them. After a chunk of combinations is generated, sent 
     * to the child workers, evaluated, and the results are inserted 
     * in the parent optimizer, this method is executed. The method 
     * returns a message that will be sent from the parent to all 
     * the child workers. The parent then waits until all the child 
     * workers have confirmed that they have received the message 
     * before proceeding to generate the next chunk of combinations.
     * 
     * By default, this method is undefined, and the parent worker
     * will not send any message to the child workers.
     * 
     * You have to override this method if you want to send a message
     * to all the child workers after each chunk of combinations is
     * evaluated and inserted.
     */
    public SendMessage?: () => Message

    /**
     * When a message is sent from the parent worker to the child workers,
     * this method is executed in the child workers. The message is passed
     * as an argument. By default, this method does nothing, so you have
     * to override it if you want to do something with the message.
     */
    public RecieveMessage(msg: Message): void {
        void msg
    }

    /** gets optimizer-provided constants for commands */
    protected getConstants(): Constants {
        const list: Constants = {}

        if (this.target) {
            list["target_name"] = this.target.GetCharacter().Options.Name
            list["target_element"] = stats.stat.Name(this.target.GetCharacter().Options.Element)
            list["target_element_aura"] = stats.aura.Name(stats.DmgToAura(this.target.GetCharacter().Options.Element))
        }
        if (this.party) {
            const members = this.party.GetMembers()
            members.forEach((member, i) => {
                const char = member.GetCharacter()
                const prefix = "member_" + i
                list[prefix + "_name"] = char.Options.Name
                list[prefix + "_element"] = stats.stat.Name(char.Options.Element)
                list[prefix + "_element_aura"] = stats.aura.Name(stats.DmgToAura(char.Options.Element))
            })
        }

        return list
    }
}
