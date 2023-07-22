import { toPng } from "html-to-image"
export async function exportImage(element: HTMLElement) {
    const dataUrl = await toPng(element)
    const blob = await fetch(dataUrl).then(res => res.blob())
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.target = "_blank"
    a.click()
}