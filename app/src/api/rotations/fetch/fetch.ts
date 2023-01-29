const indexUrlDev: string = import.meta.env.VITE_ROTATIONS_DEV_URL_INDEX
const indexUrlProd: string = import.meta.env.VITE_ROTATION_PROD_URL_INDEX
/**
 * Fetches the stored rotations from the development server
 * @returns The contents of all fetched rotation files
 */
export async function fetchRotations(mode: "dev" | "prod"): Promise<string[]> {
    if (mode === "dev") {
        return dev()
    }
    return prod()
}

async function dev() {
    const req = await fetch(indexUrlDev)
    const paths: string[] = await req.json()

    const contents = await Promise.all(
        paths.map(async path => {
            const req = await fetch(path)
            return await req.text()
        })
    )

    return contents
}


async function prod() {
    const req = await fetch(indexUrlProd + "/index.txt")
    const string = await req.text()
    const paths = string.split("\n")

    const contents = await Promise.all(
        paths.map(async path => {
            const req = await fetch(indexUrlProd + "/content/" + path.trim())
            return await req.text()
        })
    )

    return contents
}