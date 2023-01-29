import { useMouseMoveStop } from "@src/hooks/move-stop"
import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { connectRects, domRect, nearestCorner } from "./math"

const root = document.getElementById("tooltip-root")



export interface TooltipProps {
  /** search an element with `data-for` equals to this id */
  id: string
  children?: ReactNode
}

export function Tooltip({ id, children }: TooltipProps) {
  if (!root) {
    throw new Error("No tooltip root found")
  }

  const ref = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<HTMLElement | undefined>()
  const [tooltip, setTooltip] = useState<HTMLElement | undefined>()

  useMouseMoveStop((ev) => {
    if (!target || !tooltip) {
      return
    }
    const targetRect = domRect(target.getBoundingClientRect())
    const x = ev.clientX
    const y = ev.clientY

    const hovered = document.elementFromPoint(x, y)

    const inside = (
      targetRect[0] <= x && x <= targetRect[2] &&
      targetRect[1] <= y && y <= targetRect[3]
    )

    if (!inside || !target.contains(hovered)) {
      tooltip.style.display = ""
      return
    }

    tooltip.style.display = "inline-block"
    const tooltipRect = domRect(tooltip.getBoundingClientRect())

    const [targetX, targetY] = nearestCorner(targetRect, [0, 0, window.innerWidth, window.innerHeight])
    // put tooltip on the opossite of the corner nearest to window borders
    const originX = 1 - targetX
    const originY = 1 - targetY

    const [left, top] = connectRects(targetRect, tooltipRect, [originX, originY])

    tooltip.style.left = left + "px"
    tooltip.style.top = top + "px"
  })

  useEffect(() => {
    const target = document.querySelector(`[data-tooltip="${id}"]`)
    if (!target || !(target instanceof HTMLElement) || !ref.current) {
      console.warn("Target or tooltip not found for id: ", id)
      return
    }
    const tooltip = ref.current

    setTarget(target)
    setTooltip(tooltip)
  }, [id])

  return createPortal(
    <div
      id={"tooltip." + id}
      ref={ref}
      className="fixed hidden bg-neutral-900/80 border border-neutral-400 p-1 text-white">
      {children}
    </div>
    , root)
}