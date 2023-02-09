import { genshin } from "@src/genshin/core"
import { Confirm } from "@src/popup/confirm"
import { GetString } from "@src/strings/strings"
import { StorageLoad, StorageSave } from "./storage"

const prefix = "projects"

const saved = (() => {
    try {
        const json = JSON.parse(StorageLoad(prefix)) as { [name: string]: genshin.charbox.ExportedParty }
        return json
    } catch (e) {
        return {}
    }
})()

function save() {
    StorageSave(prefix, JSON.stringify(saved))
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