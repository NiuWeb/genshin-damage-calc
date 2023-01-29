import { StorageConfig } from "./config"

export function StorageSave(key: string, content: string): void {
    localStorage.setItem(StorageConfig.prefix + "_" + key, content)
}

export function StorageLoad(key: string): string {
    return localStorage.getItem(StorageConfig.prefix + "_" + key) || ""
}