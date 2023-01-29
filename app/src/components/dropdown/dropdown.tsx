import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useEffect, useRef, useState } from "react"
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons"
import { Modal } from "../modal/modal"
import { DropdownContext, useDropdownProvider } from "./context"
import { DropdownProps } from "./type"

const root = document.getElementById("modal-root")
if (!root) {
  throw new Error("Modal root not found")
}

export function Dropdown(props: DropdownProps) {
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: -1e3, y: -1e3 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const context = useDropdownProvider(props)

  if (!root) {
    throw new Error("Modal root not found")
  }

  useEffect(() => {
    if (!buttonRef.current || !contentRef.current || !inputRef.current) {
      return
    }
    const button = buttonRef.current
    const content = contentRef.current
    const input = inputRef.current
    const buttonRect = button.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()
    const inputRect = input.getBoundingClientRect()

    let [x, y] = [buttonRect.left, buttonRect.bottom]

    if (x + contentRect.width > window.innerWidth) {
      x = window.innerWidth - contentRect.width
    }
    if (y + contentRect.height > window.innerHeight) {
      y = buttonRect.top - contentRect.height - inputRect.height
    }

    content.style.minWidth = buttonRect.width + "px"

    setPosition({ x, y })
  }, [context.isOpen])


  useEffect(() => {
    if (!contentRef.current) {
      return
    }
    const content = contentRef.current
    const items = Array.from(content.querySelectorAll(".dropdown-item[data-dropdown]")) as HTMLElement[]
    const search = context.search.replace(/\s+/g, "").toLowerCase()
    if (search === "") {
      context.unfocus()
      return
    }
    let height = 0
    for (const item of items) {
      const text = item.innerText.replace(/\s+/g, "").toLowerCase()
      if (text.includes(search)) {
        content.scrollTo({
          top: height
        })
        const value = parseInt(item.getAttribute("data-dropdown") || "NaN")
        if (Number.isFinite(value)) {
          context.focus(value)
        }
        return
      }
      height += item.offsetHeight
    }
    context.unfocus()

  }, [context.search])

  return <>
    <button
      disabled={props.disabled}
      ref={buttonRef}
      onClick={context.open}
      data-tooltip={props.tooltip}
      className={props.className}>
      <div className="dropdown-button flex gap-1 justify-between">
        <div className="dropdown-title grow">
          {props.title}
        </div>
        <div className="dropdown-toggle flex items-center">
          {context.isOpen ?
            <CaretUpFill className="mt-[0.125em]" /> :
            <CaretDownFill className="mt-[0.125em]" />
          }
        </div>
      </div>
    </button>
    <Modal
      noMin
      transparent
      position={position}
      show={context.isOpen}
      onClose={context.close}>
      <input
        autoFocus
        ref={inputRef}
        className={classes(
          "min-w-[32px] w-full bg-transparent",
          props.hideSearch ? "hidden" : ""
        )}
        value={context.search}
        placeholder={GetString("PLACEHOLDER.SEARCH")}
        onChange={(ev) => context.setSearch(ev.target.value)} />

      <DropdownContext.Provider value={context}>
        <div
          ref={contentRef}
          className="content max-h-[420px] overflow-auto">
          {props.children}
        </div>
      </DropdownContext.Provider>
    </Modal>
  </>
}