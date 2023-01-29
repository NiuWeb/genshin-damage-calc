import { RoutesRouter } from "./router"
import { AppRoutes, AppRouteTree } from "./routes"
import { GetChildPaths } from "./walk"

export function AppRouter() {
  return <RoutesRouter routes={AppRoutes} />
}
/**
 * Gets the child paths of a given path in the app
 */
export function GetAppChildPaths(parent: string): string[] {
  return GetChildPaths(AppRouteTree, parent)
}