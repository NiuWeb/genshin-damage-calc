export function classes(...classes: (undefined | string | string[])[]): string {
    const result: string[] = []
    classes.forEach(clas => {
        if (typeof clas === "string") {
            result.push(clas)
        } else {
            clas?.forEach(clas => result.push(clas))
        }
    })
    return result.join(" ")
}