import { AccordionContext, useAccordionProvider } from "./context"
import { AccordionProps } from "./type"

export function Accordion({ children, ...config }: AccordionProps) {
  const context = useAccordionProvider(config)
  return <AccordionContext.Provider value={context}>
    <div className="accordion border-t border-t-neutral-900">
      {children}
    </div>
  </AccordionContext.Provider>
}