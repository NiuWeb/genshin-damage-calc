import { genshin } from "@src/genshin/core"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { StorageLoad, StorageSave } from "./storage"

const prefix = "projects"

export type StoredProjects = { [name: string]: genshin.charbox.ExportedParty }

function parse(string: string): StoredProjects {
    try {
        const json = JSON.parse(string) as StoredProjects
        return json
    } catch (e) {
        return {}
    }
}

const saved = parse(StorageLoad(prefix))

function save() {
    StorageSave(prefix, JSON.stringify(saved))
}
/** imports all projects from a string */
export function ImportProjects(str: string) {
    const existing = Object.keys(saved).map(s => s.trim())
    const loaded = parse(str)
    for(const origin in loaded) {
        let name = origin
        name = name.trim()
        if(existing.includes(name)) {
            let n = 1
            while(existing.includes(`${name} (${n})`)) {
                n++
            }
            name = `${name} (${n})`
        }
        const party = genshin.store.PartyFrom(loaded[origin])
        SaveProject(name, party)
    }
}

/** exports all projects as string */
export function ExportProjects(): string {
    return JSON.stringify(saved)
}

export function HasProject(name: string): boolean {
    return Object.keys(saved).includes(name)
}

export async function SaveProject(name: string, party: genshin.charbox.Party) {
    name = name.trim()

    if (HasProject(name)) {
        const confirm = await Confirm({
            content: GetString("MSG.CONFIRM_PROJECT_OVERRIDE", { vars: { name } })
        })
        if (!confirm) { return false }
    }

    saved[name] = genshin.charbox.ExportParty(party)
    save()
    return true
}

export function LoadProject(name: string): genshin.charbox.Party | undefined {
    const data = saved[name]
    if (!data) { return undefined }
    return genshin.store.PartyFrom(data)
}

export function GetProjects(): readonly [string, genshin.charbox.ExportedParty][] {
    return Object.entries(saved)
}

export function RemoveProject(name: string) {
    delete saved[name]
    save()
}