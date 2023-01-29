import { ModalInner } from "@src/components/modal/modal"
import { GetString } from "@src/strings/strings"
import { ReactNode, useState } from "react"
import { CreatePopup } from "./create"
import { ModalBody, ModalFooter, ModalHeader } from "@src/components/modal/parts"

/** Displays a pop-up text input */
export interface PromptProps {
  /** alert title. Default is "Prompt" */
  title?: ReactNode
  /** alert content */
  content?: ReactNode
  /** prompt input placeholder */
  placeholder?: string
  /** default text in the input */
  defaultValue?: string
}
/**
 * Displays a pop-up text input
 */
export const Prompt = CreatePopup<PromptProps, string | undefined>(function Prompt({ params, ...props }) {
  const [text, setText] = useState<string>(params.defaultValue || "")

  return <ModalInner show={props.show} onClose={() => props.proceed(undefined)}>
    <ModalHeader>
      {params.title || GetString("LABEL.CONFIRM")}
    </ModalHeader>
    <form>
      <ModalBody>
        <div className=" max-w-[640px]">
          {params.content}
        </div>
        <input
          autoFocus
          placeholder={params.placeholder}
          value={text}
          onChange={ev => setText(ev.target.value)}
          type="text"
          className="w-full p-1 bg-neutral-900" />
      </ModalBody>
      <ModalFooter>
        <button onClick={(e) => {
          e.preventDefault()
          props.proceed(text)
        }} className="p-1 bg-green-600 hover:bg-green-700 active:bg-green-800">
          {GetString("ACTION.ACCEPT")}
        </button>
      </ModalFooter>
    </form>
  </ModalInner>
})