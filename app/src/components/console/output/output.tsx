import { useCalc } from "@src/genshin/context"
import { AnsiToHtml } from "@src/utils/ansi"
import { useEffect, useRef } from "react"

export function ConsoleOutput({ show }: { show?: boolean }) {
  const [calc] = useCalc()
  const boxRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)


  useEffect(() => {
    const box = boxRef.current
    const pre = preRef.current
    if (!box || !pre) { return }

    calc.OnLog = (log) => {
      const ansi = log
      .replace(/</g, "&lt;")
      .replace(/</g, "&gt;")
      .replace(/^\s*\[(log|error|warn)([^\]]*)\]/img, (_, type: string, log: string) => {
        type = type.toLowerCase()

        const color = {
          log: "34",
          warn: "93",
          error: "33"
        }[type]

        return `\x1b[${color}m[${type.toUpperCase()}${log}]\x1b[0m`
      })
      pre.innerHTML = AnsiToHtml(ansi)
      box.scrollTop = box.scrollHeight
    }
    calc.OnLog(calc.GetLog())
  })

  return <>
    {(calc.ConsoleVisible || show) && (
      <div ref={boxRef} className=" bg-neutral-800 h-[320px] overflow-auto text-white">
        <pre
          className=" relative w-full h-full"
          ref={preRef} />
      </div>
    )}
  </>
}