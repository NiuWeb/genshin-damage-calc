import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { useContext } from "react"
import { StarFill } from "react-bootstrap-icons"
import { ArtifactContext } from "./context"

export function ArtifactStars() {
  const { artifact, update, readonly } = useContext(ArtifactContext)

  function change(stars: number) {
    if (readonly) {
      return
    }
    artifact.SetStars(stars || 4)
    update()
  }

  const stars = artifact.GetStars()
  return <Dropdown
    disabled={readonly}
    className="artifact-stars"
    onChange={([s]) => change(s)}
    notEmpty
    title={<Stars stars={stars} />}
    values={[stars]}>
    <DropdownItem value={4}>
      <Stars stars={4} />
    </DropdownItem>
    <DropdownItem value={5}>
      <Stars stars={5} />
    </DropdownItem>
  </Dropdown>
}

const Stars = ({ stars }: { stars: number }) => (
  <div className="stars flex gap-1 items-center text-sm">
    <span>{stars}</span>
    <StarFill />
  </div>
)