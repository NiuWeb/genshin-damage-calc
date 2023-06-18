import { stringSimilarity } from "string-similarity-js"
import { PriorityQueue } from "../priority/queue"

export interface SimilarityProps {
    /** The list to search in */
    list: string[]
    /** The query string */
    query: string
    /** The number of results to return */
    count?: number
    /** The minimum similarity threshold */
    threshold?: number,
    /** search first for exact substring matches? */
    substring?: boolean
}
/**
 * Search the n most similar strings in a list of strings
 */
export function searchSimilarStrings(props: SimilarityProps) {
    const { list, query, count = 1, threshold = 0.5, substring = true } = props
    const queue = new PriorityQueue<string>(count)
    for (const item of list) {
        if (substring && item.includes(query)) {
            const lenDif = item.length / query.length
            queue.Push(item, lenDif)
            continue
        }
        const similarity = stringSimilarity(query, item)
        if (similarity >= threshold) {
            queue.Push(item, similarity)
        }
    }
    return queue.Extract()
}