import { ReactNode } from "react"

export function ToolGridVertical({ title, config, description, side }: {
  title: ReactNode
  side?: ReactNode
  config?: ReactNode
  description?: ReactNode
}) {
  return <div className="tool-grid flex flex-col">
    <div className="tool-title text-xl bg-gray-800 flex p-2">
      <div className="grow">
        {title}
      </div>
      <div>{side}</div>
    </div>
    <div className="tool-description p-1 bg-slate-700 border-b border-b-gray-800">
      {description}
    </div>
    <div className="tool-config bg-slate-700 p-1">
      {config}
    </div>
  </div>
}