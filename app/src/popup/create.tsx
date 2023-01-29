import { ComponentType } from "react"
import { createRoot } from "react-dom/client"

const root = document.getElementById("modal-root")

interface ReactConfirmProps<Value> {
  proceed: (value: Value) => void
  show: boolean
}
type ConfirmableComponent<Params, Return> =
  ComponentType<ReactConfirmProps<Return> & { params: Params }>


/**
 * Creates a callable component with expected inputs and ouputs
 * @param component The component to render on call
 * @returns The caller function
 */
export function CreatePopup<Params, Return>(Component: ConfirmableComponent<Params, Return>): (params: Params) => Promise<Return> {
  if (!root) {
    throw new Error("modal root not found")
  }

  return (params: Params): Promise<Return> => {
    const miniroot = document.createElement("div")
    root.appendChild(miniroot)
    const popup = createRoot(miniroot)
    return new Promise<Return>(resolve => {
      function proceed(value: Return) {
        resolve(value)
        popup.unmount()
        root?.removeChild(miniroot)
      }
      popup.render(<Component proceed={proceed} show params={params} />)
    })
  }
}
