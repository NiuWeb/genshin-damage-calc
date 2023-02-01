import { AppPaths } from "@src/components/paths/paths"
import { classes } from "@src/utils/classes"
import { useState } from "react"
import { List } from "react-bootstrap-icons"
import { SidebarButtons } from "./bar"

export function LeftSidebar() {
  const [open, setOpen] = useState(false)
  return <>
    <ToggleButton onClick={() => setOpen(s => !s)} />
    <div className="sidebar-content hidden md:block" style={{
      display: open ? "block" : undefined
    }}>
      <AppPaths parent="/" levels={2} />
      <SidebarButtons />
    </div>
  </>
}

export function ToggleButton({ onClick }: { onClick(): void }) {
  return <div onClick={onClick} className={classes(
    "md:hidden w-full p-1 text-center",
    "bg-black/50 hover:bg-black hover:cursor-pointer"
  )}>
    <List size={32} />
  </div>
}