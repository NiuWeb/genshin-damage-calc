import { genshin } from "../core"

const bgcolors: { [stat: number]: string } = {
    [genshin.stats.stat.PYRO_DMG]: "bg-pyro",
    [genshin.stats.stat.HYDRO_DMG]: "bg-hydro",
    [genshin.stats.stat.CRYO_DMG]: "bg-cryo",
    [genshin.stats.stat.ELECTRO_DMG]: "bg-electro",
    [genshin.stats.stat.GEO_DMG]: "bg-geo",
    [genshin.stats.stat.ANEMO_DMG]: "bg-anemo",
    [genshin.stats.stat.DENDRO_DMG]: "bg-dendro",
    [genshin.stats.stat.PHYSICAL_DMG]: "bg-physical",
}
const textcolors: { [stat: number]: string } = {
    [genshin.stats.stat.PYRO_DMG]: "text-pyro",
    [genshin.stats.stat.HYDRO_DMG]: "text-hydro",
    [genshin.stats.stat.CRYO_DMG]: "text-cryo",
    [genshin.stats.stat.ELECTRO_DMG]: "text-electro",
    [genshin.stats.stat.GEO_DMG]: "text-geo",
    [genshin.stats.stat.ANEMO_DMG]: "text-anemo",
    [genshin.stats.stat.DENDRO_DMG]: "text-dendro",
    [genshin.stats.stat.PHYSICAL_DMG]: "text-physical",
}

const rawcolors: { [stat: number]: string } = {
    [genshin.stats.stat.PYRO_DMG]: "#ef7a35",
    [genshin.stats.stat.HYDRO_DMG]: "#4bc3f1",
    [genshin.stats.stat.CRYO_DMG]: "#99ccda",
    [genshin.stats.stat.ELECTRO_DMG]: "#b08fc2",
    [genshin.stats.stat.GEO_DMG]: "#ecae31",
    [genshin.stats.stat.ANEMO_DMG]: "#75c3a9",
    [genshin.stats.stat.DENDRO_DMG]: "#a0bf3a",
    [genshin.stats.stat.PHYSICAL_DMG]: "#cccccc"
}

const bgstarscolors: { [stat: number]: string } = {
    3: "bg-starsblue",
    4: "bg-starspurple",
    5: "bg-starsgold"
}
/** gets background css class for the given element */
export function ElementBgColor(element: number) {
    return bgcolors[element] || ""
}
/** gets text css class for the given element */
export function ElementTextColor(element: number) {
    return textcolors[element] || ""
}

/** gets hex css color for the given element */
export function ElementHexColor(element: number) {
    return rawcolors[element] || ""
}
/** gets background css class for stars */
export function StarsBgColor(stars: number) {
    return bgstarscolors[stars] || ""
}