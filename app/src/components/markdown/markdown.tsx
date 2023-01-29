import { ComponentProps } from "react"
import ReactMarkdown from "react-markdown"
export function Markdown({ children, linebreak, ...props }: {
  children: string | undefined, linebreak?: boolean
} & ComponentProps<typeof ReactMarkdown>) {
  let str = children || ""
  if (linebreak) {
    str = str.replace(/\n/g, "\n\n")
  }
  return <ReactMarkdown {...props}>{str}</ReactMarkdown>
}