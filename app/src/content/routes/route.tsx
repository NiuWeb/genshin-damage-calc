import { ReactNode } from "react"

export interface Route {
  path: string
  element?: ReactNode
}

export interface RouteTree extends Readonly<Route> {
  readonly children?: readonly RouteTree[]
}

/** converts a tree of routes to a list of routes */
export function RoutesFromTree(tree: RouteTree): Route[] {
  const routes: Route[] = []
  function walk(trail: string, nodes: readonly RouteTree[]) {
    for (const node of nodes) {
      let path = trail + "/" + node.path
      path = path.replace(/\/+/g, "/")
      if (!path.startsWith("/")) {
        path = "/" + path
      }
      routes.push({
        path,
        element: node.element
      })
      if (node.children) {
        walk(path, node.children)
      }
    }
  }
  walk("/", [tree])

  return routes
}