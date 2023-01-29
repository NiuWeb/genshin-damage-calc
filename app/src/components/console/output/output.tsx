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
      pre.innerHTML = AnsiToHtml(log.replace(/</g, "&lt;").replace(/</g, "&gt;"))
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