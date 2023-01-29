import { ModalInner } from "@src/components/modal/modal"
import { GetString } from "@src/strings/strings"
import { ReactNode } from "react"
import { CreatePopup } from "./create"
import { ModalBody, ModalFooter, ModalHeader } from "@src/components/modal/parts"

/** Displays a pop-up confirmation */
export interface ConfirmProps {
  /** alert title. Default is "Confirm" */
  title?: ReactNode
  /** alert content */
  content: ReactNode
}
/**
 * Displays a pop-up confirmation
 */
export const Confirm = CreatePopup<ConfirmProps, boolean>(function Confirm({ params, ...props }) {
  return <ModalInner show={props.show} onClose={() => props.proceed(false)}>
    <ModalHeader>
      {params.title || GetString("LABEL.CONFIRM")}
    </ModalHeader>
    <ModalBody>
      <div className=" max-w-[640px]">
        {params.content}
      </div>
    </ModalBody>
    <ModalFooter>
      <button onClick={() => props.proceed(false)} className="p-1 bg-red-600 hover:bg-red-700 active:bg-red-800">
        {GetString("ACTION.CANCEL")}
      </button>
      <button onClick={() => props.proceed(true)} className="p-1 bg-green-600 hover:bg-green-700 active:bg-green-800">
        {GetString("ACTION.ACCEPT")}
      </button>
    </ModalFooter>
  </ModalInner>
})