import { ReactNode } from "react"

export interface ModalProps {
    /** no minimum width */
    noMin?: boolean
    /** if defined, will set the **absolute** positions of the modal inner box */
    position?: { x: number, y: number }
    /** remove semi-opaque black background from modal outer */
    transparent?: boolean
    /** shows the modal */
    show?: boolean
    /** sets the modal height to full size */
    full?: boolean
    /** elements in the modal */
    children?: ReactNode
    /** triggers when the modal is closed */
    onClose?(): void
}