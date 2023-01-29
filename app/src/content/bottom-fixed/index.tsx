import { ConsoleEditor } from "@src/components/console/editor/editor"
import { ConsoleInput } from "@src/components/console/input/input"
import { ConsoleOutput } from "@src/components/console/output/output"

export function BottomFixed() {
  return <div className=" fixed bottom-0 left-0 right-0">
    <ConsoleInput />
    <ConsoleOutput />
    <ConsoleEditor />
  </div>
}