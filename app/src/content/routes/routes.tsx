import { Navigate } from "react-router"
import { PageInventoryArtifacts } from "../pages/inventory/artifacts"
import { PageOptimizer } from "../pages/optimizer"
import { OptimizerList } from "../pages/optimizer/list"
import { PageRotation } from "../pages/rotation"
import { PageRotationEditor } from "../pages/rotation/editor"
import { PageRotationResult } from "../pages/rotation/result"
import { PageAttributes } from "../pages/scenario/attributes"
import { PageArtifacts } from "../pages/scenario/artifacts"
import { PageEffects } from "../pages/scenario/effects"
import { RoutesFromTree, RouteTree } from "./route"
import { PageScenario } from "../pages/scenario"
import { PageProjects } from "../pages/inventory/projects"

export const AppRouteTree: RouteTree = {
  path: "/",
  element: <Navigate to="/scenario" replace />,
  children: [
    {
      path: "scenario",
      element: <PageScenario />,
      children: [
        {
          path: "attributes",
          element: <PageAttributes />
        },
        {
          path: "artifacts",
          element: <PageArtifacts />
        },
        {
          path: "effects",
          element: <PageEffects />
        },
      ]
    },
    {
      path: "rotation",
      element: <PageRotation />,
      children: [
        {
          path: "editor",
          element: <PageRotationEditor />
        },
        {
          path: "result",
          element: <PageRotationResult />
        }
      ]
    },
    {
      path: "optimize",
      element: <PageOptimizer />,
      children: OptimizerList
    },
    {
      path: "inventory",
      element: <Navigate to="/inventory/projects" replace />,
      children: [
        {
          path: "projects",
          element: <PageProjects />
        },
        {
          path: "artifacts",
          element: <PageInventoryArtifacts />
        }
      ]
    }
  ]
}
export const AppRoutes = RoutesFromTree(AppRouteTree)