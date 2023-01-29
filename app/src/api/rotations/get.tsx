import { fetchRotationsDev } from "./fetch/fetch-dev"
import { parseRotation, RotationContent } from "./parse"

const AppMode = import.meta.env.MODE
/**
 * Gets the rotations data from the server
 */
export async function getRotations(): Promise<RotationContent[]> {
  const files = await (() => {
    if (AppMode === "development") {
      return fetchRotationsDev()
    } else {
      throw new Error("No method defined to get the rotations in production mode")
    }
  })()

  return files
    .map(file => parseRotation(file))
    .sort((a, b) => {
      if (a.characters.length === b.characters.length) {
        return a.title.localeCompare(b.title)
      } else {
        return a.characters.length - b.characters.length
      }
    })
}