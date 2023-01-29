import { RouteTree } from "./route"

function pathjoin(...parts: string[]): string {
    let path = parts.join("/").replace(/\/+/g, "/")
    if (!path.startsWith("/")) {
        path = "/" + path
    }
    return path
}

/**
 * Gets the child paths of a given path
 * @param tree Tree to look in
 * @param parent Parent path 
 * @returns 
 */
export function GetChildPaths(tree: RouteTree, parent: string): string[] {
    const parts = parent
        .replace(/\/+/g, "/")
        .replace(/^\//, "")
        .split("/")
        .filter(s => s !== "")

    function walker(trail: string, tree: RouteTree, parts: string[]): string[] {
        if (parts.length === 0) {
            if (tree.children) {
                return tree.children.map(child => pathjoin(trail, tree.path, child.path))
            } else { return [] }
        } else {
            if (!tree.children) { return [] }
            const child = tree.children.find(child => pathjoin(child.path) === pathjoin(parts[0]))
            if (!child) { return [] }
            return walker(pathjoin(trail, tree.path), child, parts.slice(1))
        }
    }
    return walker("", tree, parts)
}