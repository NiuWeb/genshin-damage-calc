import { classes } from "@src/utils/classes"
import { useContext, useRef, KeyboardEvent } from "react"
import { DropdownContext } from "./context"
import { DropdownItemEmpty } from "./item-empty"
import { DropdownItemProps } from "./type"

export function DropdownItem(props: DropdownItemProps) {
  const context = useContext(DropdownContext)
  const ref = useRef<HTMLDivElement>(null)
  const active = context.isActive(props.value)

  function keyup(ev: KeyboardEvent<HTMLDivElement>) {
    if (ev.code === "Enter") {
      context.toggle(props.value)
      if (!context.multiple) {
        context.close()
      }
    }
  }

  return <DropdownItemEmpty {...props}>
    <div
      ref={ref}
      onKeyUp={keyup}
      className={classes(
        active ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-500 hover:bg-gray-600",
        "p-1 hover:cursor-pointer",
        "last-of-type:border-none",
      )}>
      {props.children ?? null}
    </div>
  </DropdownItemEmpty>
}