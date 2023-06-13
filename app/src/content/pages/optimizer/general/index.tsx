import { WorkersSelect } from "@src/components/genshin/optimizer/workers"
import { PartySelect } from "@src/components/genshin/party/select"
import { ToolGridVertical } from "@src/components/layout/tool-grid-vertical"
import { Markdown } from "@src/components/markdown/markdown"
import { GetString } from "@src/strings/strings"
import { Config } from "./config"

export function PageGeneralOptimizer() {
  return <div className="page-general-optimizer p-1 grid xl:grid-cols-7">
    <div></div>
    <div className="col-span-5">
      <ToolGridVertical
        title={GetString("OPTIMIZER.GENERAL")}
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
            {GetString("OPTIMIZER.GENERAL", { description: true })}
          </Markdown>
        } />
    </div>
    <div></div>
  </div>
}