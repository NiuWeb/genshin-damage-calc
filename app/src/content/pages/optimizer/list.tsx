import { PageArtifactsOptimizer } from "./artifacts"
import { PageFoodOptimizer } from "./food"
import { PageGeneralOptimizer } from "./general"
import { PageMainstatsOptimizer } from "./mainstats"
import { PageNextRollOptimizer } from "./nextroll"
import { PageSetOptimizer } from "./set"
import { PageSubstatsOptimizer } from "./substats"
import { PageWeaponOptimizer } from "./weapon"

export const OptimizerList = [
  {
    path: "substats",
    string: "OPTIMIZER.SUBSTATS",
    element: <PageSubstatsOptimizer />
  },
  {
    path: "mainstat",
    string: "OPTIMIZER.MAINSTAT",
    element: <PageMainstatsOptimizer />
  },
  {
    path: "nextroll",
    string: "OPTIMIZER.NEXTROLL",
    element: <PageNextRollOptimizer />
  },
  {
    path: "set",
    string: "OPTIMIZER.SET",
    element: <PageSetOptimizer />
  },
  {
    path: "weapon",
    string: "OPTIMIZER.WEAPON",
    element: <PageWeaponOptimizer />
  },
  {
    path: "general",
    string: "OPTIMIZER.GENERAL",
    element: <PageGeneralOptimizer />
  },
  {
    path: "food",
    string: "OPTIMIZER.FOOD",
    element: <PageFoodOptimizer />
  },
  {
    path: "artifacts",
    string: "OPTIMIZER.ARTIFACTS",
    element: <PageArtifactsOptimizer />
  }
]