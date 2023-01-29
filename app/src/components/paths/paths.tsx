import { GetAppChildPaths } from "@src/content/routes"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useNavigate, useLocation } from "react-router"

export interface AppPaths {
  parent: string
  levels: number
}
export function AppPaths(props: AppPaths) {
  return <InnerAppPaths {...props} level={1} />
}

function InnerAppPaths(props: AppPaths & { level: number }) {
  const paths = GetAppChildPaths(props.parent).filter(s => !s.includes("*"))
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return <div  className={props.level % 2 === 0 ? "bg-neutral-800" : "bg-neutral-700"}>
    {paths.map((path, i) => (
      <div  key={i}>
        <button
          onClick={() => navigate(path)}
          className={classes(
            "w-full text-left p-0.5 hover:bg-black/25",
            pathname === path ? " border-r-4 border-r-green-600 bg-black/10" : ""
          )}>
          {GetString("PATH:" + path)}
        </button>
        {props.level < props.levels && (
          <div  className=" border-l-8 border-l-neutral-900">
            <InnerAppPaths
              parent={path}
              levels={props.levels}
              level={props.level + 1} />
          </div>
        )}
      </div>
    ))}
  </div>
}