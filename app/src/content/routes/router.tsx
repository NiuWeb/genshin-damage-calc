import { Routes, Route } from "react-router"
import { Route as AppRoute } from "./route"

export function RoutesRouter({ routes }: { routes: AppRoute[] }) {
  return <Routes>
    {routes.map((route, i) => (
      <Route key={i} {...route} />
    ))}
  </Routes>
}