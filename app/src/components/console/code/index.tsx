import { ReactNode, useEffect, useRef } from "react"
import * as monaco from "monaco-editor"
import "./style.css"
import { classes } from "@src/utils/classes"

export function Code({ children, pre }: { children?: ReactNode, pre?: boolean }) {
  const el = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (!el.current) {
      return
    }
    const div = el.current
    if (typeof children === "string") {
      div.innerText = children
    }
    div.innerHTML = div.innerText

    monaco.editor.colorizeElement(div, {
      theme: "genshin-cmd-theme",
    }).then(() => {
      const children = Array.from(div.children).reverse()
      for (const child of children) {
        if (child instanceof HTMLElement && (child.tagName === "BR" || child.innerText.trim() === "")) {
          div.removeChild(child)
        } else break
      }
    })
  }, [])
  const className = "genshin-code bg-neutral-900 text-sm px-0.5"
  return pre ? (
    <pre
      ref={el}
      data-lang="genshin-cmd"
      className={classes(className, "whitespace-nowrap overflow-auto")}>
      {children}
    </pre>
  ) : (
    <code ref={el} data-lang="genshin-cmd" className={className}>{children}</code>
  )
}