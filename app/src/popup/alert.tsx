import { ModalInner } from "@src/components/modal/modal"
import { GetString } from "@src/strings/strings"
import { ReactNode } from "react"
import { CreatePopup } from "./create"
import { ModalBody, ModalHeader } from "@src/components/modal/parts"

/** Displays a pop-up alert */
export interface AlertProps {
  /** alert title. Default is "Alert" */
  title?: ReactNode
  /** alert content */
  content: ReactNode
  /** full height mode */
  full?: boolean
}
/**
 * Displays a pop-up alert
 */
export const Alert = CreatePopup<AlertProps, void>(function Alert({ params, ...props }) {
  return <ModalInner full={params.full} show={props.show} onClose={props.proceed}>
    <ModalHeader>
      {params.title || GetString("LABEL.ALERT")}
    </ModalHeader>
    <ModalBody>
      {params.content}
    </ModalBody>
  </ModalInner>
})