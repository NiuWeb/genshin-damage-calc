const indexUrlDev: string = import.meta.env.VITE_ROTATIONS_DEV_URL_INDEX
const indexUrlProd: string = import.meta.env.VITE_ROTATION_PROD_URL_INDEX
/**
 * Fetches the stored rotations from the development server
 * @returns The contents of all fetched rotation files
 */
export async function fetchRotations(mode: "dev" | "prod"): Promise<string[]> {
    const req = await fetch(mode === "dev" ? indexUrlDev : indexUrlProd)
    const paths: string[] = await req.json()

    const contents = await Promise.all(
        paths.map(async path => {
            const req = await fetch(path)
            return await req.text()
        })
    )

    return contents
}