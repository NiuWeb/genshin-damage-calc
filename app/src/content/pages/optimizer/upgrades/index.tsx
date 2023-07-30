import { ToolGridVertical } from "@src/components/layout/tool-grid-vertical"
import { Markdown } from "@src/components/markdown/markdown"
import { GetString } from "@src/strings/strings"
import { Config } from "./config"

export function PageUpgradesOptimizer() {
  return <div className="page-upgrades-optimizer p-1 grid xl:grid-cols-7">
    <div></div>
    <div className="col-span-5">
      <ToolGridVertical
        title={<div className="flex gap-4 items-center">
          <span>{GetString("OPTIMIZER.UPGRADES")}</span>
        </div>}
        config={<Config />}
        description={
          <Markdown components={{
            li: e => <li {...e} className="mx-6 my-1 list-disc" />,
            a: e => <a {...e}
              target="_blank"
              className="text-blue-300 hover:underline hover:text-blue-400" />
          }}>
            {GetString("OPTIMIZER.UPGRADES", { description: true })}
          </Markdown>
        } />
    </div>
    <div></div>
  </div>
}