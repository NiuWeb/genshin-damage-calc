import "./style.css"
import * as Parts from "./parts"
import { Modal } from "@src/components/modal/modal"
import { useContext } from "react"
import { EnkaModalContext } from "./context"
import { ModalBody, ModalHeader } from "@src/components/modal/parts"
import { GetString } from "@src/strings/strings"

/**
 * Component: contains the options to import characters from Enka
 */
export function EnkaModal() {
  const { visible, hide, onLoad } = useContext(EnkaModalContext)

  function close() {
    hide()
    onLoad?.()
  }

  return <Modal show={visible} onClose={() => close()}>
    <ModalHeader>
      {GetString("ACTION.ENKA_IMPORT")}
    </ModalHeader>
    <ModalBody>
      <div className="flex flex-col gap-1 enka-modal">
        <div className="text-center">
          Powered by <a
            href="https://enka.network"
            target="_blank">Enka.Network</a>
        </div>
        <Parts.Import />
        <div className="text-center">
          Or
        </div>
        <Parts.PasteText />
        <Parts.RawField />
        <div className="flex justify-center">
          <Parts.RawImport />
        </div>
      </div>
    </ModalBody>
  </Modal >
}