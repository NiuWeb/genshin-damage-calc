import { fetchRotations } from "./fetch/fetch"
import { parseRotation, RotationContent } from "./parse"

const AppMode = import.meta.env.MODE
/**
 * Gets the rotations data from the server
 */
export async function getRotations(): Promise<RotationContent[]> {
  const files = await (() => {
    if (AppMode === "development") {
      return fetchRotations("dev")
    } else {
      return fetchRotations("prod")
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