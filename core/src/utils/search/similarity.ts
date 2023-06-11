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
    threshold?: number
}
/**
 * Search the n most similar strings in a list of strings
 */
export function searchSimilarStrings(props: SimilarityProps) {
    const { list, query, count = 1, threshold = 0.5 } = props
    const queue = new PriorityQueue<string>(count)
    for (const item of list) {
        const similarity = stringSimilarity(query, item)
        if (similarity >= threshold) {
            queue.Push(item, similarity)
        }
    }
    return queue.Extract()
}