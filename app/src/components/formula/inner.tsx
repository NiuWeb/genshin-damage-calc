import { classes } from "@src/utils/classes"
import { domToReact, DOMNode } from "html-react-parser"
import { useMemo } from "react"
import { parseFormulaHtml } from "./html"
import { FormulaProps } from "./type"
import HTMLReactParser, { Element, Text } from "html-react-parser"
import { Tooltip } from "@src/components/tooltip/tooltip"

export function InnerFormula({ expr, replace }: FormulaProps) {
  const html = useMemo(() => parseFormulaHtml(expr), [expr])
  const element = HTMLReactParser(html, {
    replace(domNode) {
      if (!domNodeIsElement(domNode)) { return }
      const text = domNode.children.filter(child => domNodeIsText(child)) as Text[]

      // reduce class names
      const classNames = classes(
        domNode.attribs.class,
        ...text.map(text => replace?.[text.data]?.className)
      )

      // reduce css styles
      const styles = text
        .map(text => (
          replace?.[text.data]?.style
        ))
        .reduce((a, b) => (
          { ...a, ...(b || {}) }
        ), {})

      // reduce legend texts
      const legend = text
        .map(text => (
          replace?.[text.data]?.legend
        ))
        .filter(a => !!a)
        .reduce((a, b) => a + "\n" + b, "")

      // replace text values
      text.forEach(text => {
        const value = replace?.[text.data]?.value
        if (value) {
          text.data = String(value).valueOf()
        }
      })

      const id = Math.random().toString(36)

      return <>
        <span className={classNames} style={styles} data-tooltip={id}>
          {domToReact(domNode.children)}
        </span>
        {!!legend && <Tooltip id={id}>{legend}</Tooltip>}
      </>
    },
  })

  return <div className="formula font-serif text-lg flex items-center gap-1">
    {element}
  </div>
}

function domNodeIsElement(domNode: DOMNode): domNode is Element {
  return domNode.type === "tag"
}
function domNodeIsText(domNode: DOMNode): domNode is Text {
  return domNode.type === "text"
}