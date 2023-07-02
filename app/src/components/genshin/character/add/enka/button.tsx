import { GetString } from "@src/strings/strings"
import { EnkaModalContext, useEnkaModalContext } from "./context"
import { EnkaModal } from "./modal"

export function EnkaModalButton({ onLoad }: { onLoad?: EnkaModalContext["onLoad"] }) {
  const context = useEnkaModalContext(onLoad)

  return <EnkaModalContext.Provider value={context}>
    <EnkaModal />
    <button
      onClick={() => context.show()}
      className="p-2 text-black bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700">
      {GetString("ACTION.ENKA_IMPORT")}
    </button>
  </EnkaModalContext.Provider>
}