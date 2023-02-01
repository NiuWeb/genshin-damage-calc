import { GithubLatest } from "@src/components/github/latest"
import { classes } from "@src/utils/classes"
import { BottomFixed } from "./bottom-fixed"
import { LeftSidebar } from "./left-sidebar"
import { AppRouter } from "./routes"

export function AppContent() {
  return <div
    className={classes(
      "bg-gray-900 text-white m-0 absolute w-full h-[calc(100%-32px)] overflow-auto",
      "md:grid md:grid-cols-6 flex flex-col"
    )}>
    <div className="bg-neutral-900">
      <LeftSidebar />
    </div>
    <div className="overflow-auto md:col-span-5 relative h-full">
      <AppRouter />
    </div>
    <BottomFixed />
    <GithubLatest />
  </div>
}