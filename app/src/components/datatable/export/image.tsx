import { Alert } from "@src/popup/alert"
import { GetString } from "@src/strings/strings"
import { toPng } from "html-to-image"
export async function exportImage(element: HTMLElement) {
    const dataUrl = await toPng(element)
    const blob = await fetch(dataUrl).then(res => res.blob())
    const url = URL.createObjectURL(blob)

    await Alert({
        title: GetString("ACTION.EXPORT.IMAGE"),
        content: <img
            className="max-w-[720px]"
            src={url} />,
    })
}