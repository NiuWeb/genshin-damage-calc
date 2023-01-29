import { classes } from "@src/utils/classes"
import { ReactNode } from "react"

export function ScenarioGrid({ children, className }: { children: ReactNode, className?: string }) {
  return <div className={classes(
    "scenario-grid grid gap-1 grid-flow-dense xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2",
    className
  )}>
    {children}
  </div>
}