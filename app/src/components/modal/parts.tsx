import { ReactNode, useContext } from "react"
import { XCircle } from "react-bootstrap-icons"
import { ModalCloseContext } from "./modal"

export function ModalHeader({ children }: { children: ReactNode }) {
  const close = useContext(ModalCloseContext)
  return <div  className="bg-neutral-900 flex items-center p-1 border-b border-b-neutral-400 text-xl">
    <div className="grow">
      {children}
    </div>
    <button onClick={close} className="p-1 bg-red-600 hover:bg-red-700 active:bg-red-800">
      <XCircle />
    </button>
  </div>
}

export function ModalBody({ children }: { children: ReactNode }) {
  return <div  className="p-1 grow overflow-auto">
    {children}
  </div>
}
export function ModalFooter({ children }: { children: ReactNode }) {
  return <div  className="p-1 flex gap-2 justify-center border-t border-t-neutral-400">
    {children}
  </div>
}