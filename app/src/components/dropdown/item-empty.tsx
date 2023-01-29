import { classes } from "@src/utils/classes"
import { useContext } from "react"
import { DropdownContext } from "./context"
import { DropdownItemProps } from "./type"

export function DropdownItemEmpty(props: DropdownItemProps) {
  const context = useContext(DropdownContext)

  function toggle() {
    context.toggle(props.value)
    if (!context.multiple) {
      context.close()
    }
  }

  return <div
    data-tooltip={props.tooltip}
    tabIndex={0}
    onClick={toggle}
    data-dropdown={props.value}
    className={classes(
      "dropdown-item box-border border-b border-gray-900",
      context.focused === props.value ? "pl-1 bg-blue-900" : undefined
    )}>
    {props.children}
  </div>
}