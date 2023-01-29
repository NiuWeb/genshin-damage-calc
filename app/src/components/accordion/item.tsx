import { classes } from "@src/utils/classes"
import { useContext } from "react"
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons"
import { AccordionContext } from "./context"
import { AccordionItemProps } from "./type"

export function AccordionItem({ children, title, value }: AccordionItemProps) {
  const context = useContext(AccordionContext)
  const active = context.Has(value)

  function toggle() {
    context.Toggle(value)
  }

  return <div className="accordion-item bg-neutral-800 ">
    <div onClick={toggle} className={classes(
      "p-1 flex flex-row gap-1 items-center",
      "hover:bg-neutral-900/25 hover:cursor-pointer",
      "border-b border-b-neutral-900"
    )}>
      {active ? (
        <CaretUpFill />
      ) : (
        <CaretDownFill />
      )}
      <div className="title grow">
        {title}
      </div>
    </div>
    {active ? (
      <div className="p-1 bg-neutral-700 border-b border-b-neutral-900">{children}</div>
    ) : null}
  </div>
}