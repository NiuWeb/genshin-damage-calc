/**
 * Downloads a file
 * @param filename The filename to download with
 * @param content The file content
 */
export function downloadFile(filename: string, content: string) {
    const element = document.createElement("a")
    element.style.display = "none"
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", filename)

    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

/**
     * Opens a file dialog and loads a file from the client
     * @param accept Accept formats (.jpg, .json, etc.)
     * @param progressEvent Function that will be called when loader notifies a progress
     * @returns Promise: String array with the content of all the selected files
     */
export async function loadFile(accept: string, progressEvent?: (event: ProgressEvent<FileReader>) => void) {
    const element = document.createElement("input")
    element.setAttribute("type", "file")
    element.setAttribute("accept", accept)

    function progress(event: ProgressEvent<FileReader>) {
        if (progressEvent) {
            progressEvent(event)
        }
    }

    const promise = new Promise<string | undefined>((resolve, reject) => {
        element.onchange = () => {
            if (!element.files) return

            const file = element.files[0]
            const reader = new FileReader()
            reader.addEventListener("loadstart", progress)
            reader.addEventListener("load", progress)
            reader.addEventListener("progress", progress)
            reader.addEventListener("error", progress)
            reader.addEventListener("abort", progress)

            const promise = new Promise<string>(resolve => {
                reader.onloadend = (ev) => {
                    progress(ev)
                    const txt = reader.result?.toString()
                    if (txt) resolve(txt)
                    else reject("Text is undefined")
                }
            })
            reader.readAsText(file)

            promise.then(resolve).catch(reject)
            return promise
        }
    })

    document.body.appendChild(element)
    element.focus()
    element.click()
    document.body.removeChild(element)
    return promise
}