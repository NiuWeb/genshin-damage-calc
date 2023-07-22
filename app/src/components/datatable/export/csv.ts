import papa from "papaparse"
export function exportCsv(element: HTMLElement) {
    const table: string[][] = []

    const rows = element.getElementsByTagName("tr")
    for (const row of rows) {
        const cells = row.querySelectorAll("th, td")
        const rowValues: string[] = []
        for (const cell of cells) {
            if (cell instanceof HTMLElement) {
                rowValues.push(cell.innerText)
            }
        }
        table.push(rowValues)
    }

    const text = papa.unparse(table)
    const blob = new Blob([text], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.target = "_blank"
    a.click()
}