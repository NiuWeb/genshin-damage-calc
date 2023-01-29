import { ReactNode } from "react"

export function ToolGrid({ title, config, description, side }: {
  title: ReactNode
  side?: ReactNode
  config?: ReactNode
  description?: ReactNode
}) {
  return <div className="tool-grid grid xl:grid-cols-3">
    <div className="tool-title xl:col-span-3 p-2 text-xl bg-gray-800 flex">
      <div className="grow">

        {title}
      </div>
      <div>{side}</div>
    </div>
    <div className="tool-config bg-slate-700 p-1">
      {config}
    </div>
    <div className="tool-description xl:col-span-2 p-1 bg-slate-700 border-l border-l-gray-800">
      {description}
    </div>
  </div>
}