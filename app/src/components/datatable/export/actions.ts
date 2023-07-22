import { exportCsv } from "./csv"
import { exportImage } from "./image"

export interface ExportAction {
    label: string
    action(element: HTMLElement): void | Promise<void>
}
export const exportActions: ExportAction[] = [
    {
        label: "ACTION.EXPORT.IMAGE",
        async action(element) {
            await exportImage(element)
        }
    },
    {
        label: "ACTION.EXPORT.CSV",
        action(element) {
            exportCsv(element)
        }
    }
]