import "./style.css"
import { useEffect, useRef, useState } from "react"
import { GetString } from "@src/strings/strings"
import { InnerFormula } from "./inner"
import { FormulaProps } from "./type"
import { FormulaLegend } from "./legend"

export function Formula({ expr, replace }: FormulaProps) {
    const lines = expr.trim().split("\n")

    const [copied, setCopied] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // find the alignment divs and put them at the same x position
    useEffect(() => {
        if (!ref.current) { return }
        const alignItems = Array.from(ref.current.getElementsByClassName("align")) as HTMLDivElement[]
        const itemsOffset = alignItems
            .map(item => {
                const parentX = item.parentElement?.getBoundingClientRect().x || 0
                const selfX = item.getBoundingClientRect().x
                return selfX - parentX
            })
        const maxOffset = itemsOffset.reduce((a, b) => Math.max(a, b), 0)

        alignItems.forEach((item, i) => {
            const x = itemsOffset[i]
            const width = maxOffset - x
            item.style.width = width + "px"
        })
    }, [expr])

    function copy() {
        if (!ref.current) { return }
        setCopied(true)

        const formulas = Array.from(ref.current.getElementsByClassName("formula")) as HTMLDivElement[]
        const lines = formulas.map(el => el.innerText.replace(/\n+/g, ""))
        const str = lines.join("\n")

        navigator.clipboard.writeText(str)

        setTimeout(() => setCopied(false), 2000)
    }

    return <>
        <div className="formula-container border border-neutral-900 p-1 bg-neutral-700">
            <div className="formulas flex flex-col gap-1" ref={ref}>
                {lines.map((line, i) => (
                    <InnerFormula key={i} expr={line} replace={replace} />
                ))}
            </div>
            <div className="flex justify-end">
                <button onClick={copy} className="text-black text-sm p-1 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300">
                    {GetString(copied ? "LABEL.COPIED" : "ACTION.COPY")}
                </button>
            </div>
        </div>
        <FormulaLegend replace={replace} />
    </>
}
