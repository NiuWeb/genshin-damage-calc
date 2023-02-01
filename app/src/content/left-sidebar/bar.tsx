import { GithubButton } from "@src/components/github"
import { LanguageSelect } from "@src/components/language"

export function SidebarButtons() {
  return <div className="sidebar-icons p-1 flex justify-between">
    <LanguageSelect />
    <GithubButton />
  </div>
}