import { createPortal } from "react-dom"
import { createContext, MouseEvent, useRef } from "react"
import { ModalProps } from "./type"
import { classes } from "@src/utils/classes"

const root = document.getElementById("modal-root")
export const ModalCloseContext = createContext<() => void>(() => 0)

export function ModalInner(props: ModalProps) {
  const inner = useRef<HTMLDivElement>(null)
  const outer = useRef<HTMLDivElement>(null)

  function click(ev: MouseEvent<Element, globalThis.MouseEvent>) {
    if (ev.target !== outer.current) {
      return
    }
    const innerDiv = inner.current
    if (!innerDiv) {
      props.onClose?.()
      return
    }
    const [mouseX, mouseY] = [ev.clientX, ev.clientY]

    const rect = innerDiv.getBoundingClientRect()
    const [x1, y1, x2, y2] = [rect.left, rect.top, rect.right, rect.bottom]

    const inside =
      x1 <= mouseX && mouseX <= x2 &&
      y1 <= mouseY && mouseY <= y2

    if (!inside) {
      props.onClose?.()
    }
  }

  return <>
    {props.show && (
      <div
        ref={outer}
        onClick={click}
        className={classes(
          "modal-outer",
          "fixed top-0 left-0 right-0 bottom-0",
          "flex justify-center items-center",
          !props.transparent ? "bg-black/50" : undefined
        )}>
        <ModalCloseContext.Provider value={() => props.onClose?.()}>
          <div
            ref={inner}
            style={props.position ? {
              position: "absolute",
              left: props.position.x + "px",
              top: props.position.y + "px"
            } : undefined}
            className={classes(
              "modal-inner border border-black",
              props.noMin ? undefined : "min-w-[320px]",
              "flex flex-col bg-neutral-800 text-white max-w-full max-h-full",
              props.full ? "h-full" : undefined
            )}>
            {props.children}
          </div>
        </ModalCloseContext.Provider>
      </div>
    )}
  </>
}

export function Modal(props: ModalProps) {
  if (!root) {
    throw new Error("Modal root not found")
  }
  return createPortal(<ModalInner {...props} />, root)
}