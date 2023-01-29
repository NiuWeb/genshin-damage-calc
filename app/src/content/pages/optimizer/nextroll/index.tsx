import { WorkersSelect } from "@src/components/genshin/optimizer/workers"
import { PartySelect } from "@src/components/genshin/party/select"
import { ToolGrid } from "@src/components/layout/tool-grid"
import { Markdown } from "@src/components/markdown/markdown"
import { GetString } from "@src/strings/strings"
import { Config } from "./config"

export function PageNextRollOptimizer() {
  return <div className="page-nextroll-optimizer p-1 grid xl:grid-cols-7">
    <div></div>
    <div className="col-span-5">
      <ToolGrid
        title={GetString("OPTIMIZER.NEXTROLL")}
        side={
          <div className="flex items-center gap-2">
            <span>{GetString("LABEL.TARGET")}</span>
            <PartySelect />
            <WorkersSelect />
          </div>
        }
        config={<Config />}
        description={
          <Markdown components={{ li: e => <li {...e} className="mx-6 my-1 list-disc" /> }}>
            {GetString("OPTIMIZER.NEXTROLL", { description: true })}
          </Markdown>
        } />
    </div>
    <div></div>
  </div>
}