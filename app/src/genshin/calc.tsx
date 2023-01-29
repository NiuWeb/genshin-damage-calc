import { Code } from "@src/components/console/code"
import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { CodeEditor } from "@src/utils/editor"
import { calcConfig } from "./state/config"
import { genshin } from "./core"
import { HelpComponent } from "./utils/help"
import { CalcResults } from "./state/results"
import { CalcInventory } from "./state/inventory"
import { CalcProjects } from "./projects/projects"

const globalLog = genshin.cmd2.Logger.Global

/** Global scenario for this app */
export const Calc = new (class Runner {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    globalThis.__GENSHIN = this.runner
    globalLog.Out = () => this.OnLog(globalLog.String())

    this.runner = new genshin.Runner()
    this.Projects.Open("Untitled", this.runner.Scenario.Party)
  }
  private runner: genshin.Runner

  /** Calc open projects */
  readonly Projects = new CalcProjects(party => {
    const scenario = this.runner.Scenario
    scenario.Reset()
    scenario.Party = party
    scenario.Character = party.GetMembers()[0]
  })

  /** console is visible or not */
  ConsoleVisible = false

  /** editor is visible or not */
  EditorVisible = false

  OnLog: (log: string) => void = () => void 0

  /** Editor code */
  readonly Editor = new CodeEditor("calc")

  /** Calc results */
  readonly Results = new CalcResults()

  /** Calc optimizer config */
  readonly Config = calcConfig()

  /** Calc inventory */
  readonly Inventory = new CalcInventory()

  /** Gets the calculator runner */
  Get(): genshin.Runner {
    return this.runner
  }
  /** runs a command in the calculator */
  Run(command: string): void {
    if (command === "") {
      return
    }
    if (command === "clear") {
      this.Clear()
      return
    }
    this.Log("> " + command)

    const helpMatch = command.match(/^\s*help(.*?)$/i)
    if (helpMatch) {
      const parts = helpMatch[1].trim().replace(/\s+/g, " ").split(/\s/)
      const help = this.runner.Program.Help(parts)
      Alert({
        title: GetString("LABEL.HELP"),
        content: <HelpComponent help={help} />
      })
    } else {
      try {
        this.runner.Program.CompileString(command)()
      } catch (e) {
        console.error(e)
      }
    }
  }

  /** runs a commands but asking for a confirmation first */
  async RunConfirm(cmd: string): Promise<boolean> {
    const confirm = await Confirm({
      content: <div className="flex flex-col gap-2">
        <div>{GetString("MSG.CONFIRM_COMMAND_RUN")}</div>
        <Code pre>{cmd}</Code>
      </div>
    })

    if (!confirm) return false
    this.Run(cmd)

    return true
  }

  /** custom log save */
  Log(...args: unknown[]): void {
    globalLog.Log(args.map(arg => String(arg).valueOf()).join(" "))
    this.OnLog(globalLog.String())
  }
  /** Gets the current log value */
  GetLog(): string {
    return globalLog.String()
  }
  /** Clears the log */
  Clear(): void {
    globalLog.Clear()
    this.OnLog(globalLog.String())
  }
})