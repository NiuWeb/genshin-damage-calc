import { Modal } from "@src/components/modal/modal"
import { ModalBody, ModalFooter, ModalHeader } from "@src/components/modal/parts"
import { GetString } from "@src/strings/strings"
import { PrettyMs } from "@src/utils/pretty-ms"
import { ReactNode, useEffect, useRef, useState } from "react"
import { createRoot, Root } from "react-dom/client"

/** Renders a sepparate modal with a loading bar */
export class Loading {
  /** 
   * creates a loading bar
   * @param children Nodes to put in the loadingbar modal
   */
  constructor(children?: ReactNode) {
    this.el = document.createElement("div")
    document.body.appendChild(this.el)

    this.root = createRoot(this.el)

    const InnerLoading = () => {
      const [time, setTime] = useState(0)
      const barRef = useRef<HTMLDivElement>(null)
      const txtRef = useRef<HTMLDivElement>(null)
      useEffect(() => {
        if (barRef.current) {
          this.bar = barRef.current
        }
        if (txtRef.current) {
          this.txt = txtRef.current
        }
        const now = performance.now()
        const timer = setInterval(() => {
          setTime(performance.now() - now)
        }, 1000)

        return () => void clearInterval(timer)
      }, [])

      return <Modal show onClose={() => this.OnClose()}>
        <ModalHeader>{GetString("LABEL.LOADING")}</ModalHeader>
        <ModalBody>
          <div className="flex justify-center m-1">
            <div className="w-[250px] bg-neutral-400">
              <div className="h-[24px] bg-orange-400 w-0 " ref={barRef}>
                <div ref={txtRef} className=" float-left h-[24px] w-[250px] text-black text-center" />
              </div>
            </div>
          </div>
          {children}
        </ModalBody>
        <ModalFooter>
          {GetString("LABEL.TIME_ELAPSED_X", { vars: { time: PrettyMs(time) } })}
        </ModalFooter>
      </Modal>
    }

    this.root.render(<InnerLoading />)
    this.time = performance.now()
  }
  private el: HTMLDivElement
  private bar?: HTMLDivElement
  private txt?: HTMLDivElement
  private root: Root

  private progress = 0
  private total = 0
  private time = 0

  private ended = false

  OnClose: () => void = () => void 0


  SetProgress(progress: number): void {
    this.progress = progress
    if (!this.bar || !this.txt) { return }
    let width = 0
    if (this.total > 0) {
      width = 250 * this.progress / this.total
    }
    this.bar.style.width = width + "px"
    this.txt.innerText = this.progress + "/" + (this.total > 0 ? this.total : "?")
  }

  SetTotal(total: number): void {
    this.total = total
    if (!this.bar || !this.txt) { return }
    let width = 0
    if (this.total > 0) {
      width = 250 * this.progress / this.total
    }
    this.bar.style.width = width + "px"
    this.txt.innerText = this.progress + "/" + (this.total > 0 ? this.total : "?")
  }

  /**
   * Closes the loading bar
   * @returns the elapsed time since the loading bar creation, in ms
   */
  End(): number {
    const elapsed = performance.now() - this.time
    if (this.ended) { return elapsed }
    this.ended = true
    this.root.unmount()
    document.body.removeChild(this.el)
    return elapsed
  }
}


