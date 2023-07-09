export type KeyArray = readonly unknown[] | []
// eslint-disable-next-line @typescript-eslint/ban-types
export type KeyRecord = {}
export type Key = KeyArray | KeyRecord
export type ReadOnlyRecord<T extends Key> = {
    readonly [k in keyof T]: T[k] extends Key ? ReadOnly<T[k]> : T[k]
}

export type ReadOnly<T> = (
    T extends readonly (infer R)[] ? readonly ReadOnly<R>[] : (
        T extends KeyRecord ? ReadOnlyRecord<T> : T
    )
)

/** 
 * marks an object as readonly, recursively.
 * It DOES NOT modify the input object in any way, it just
 * changes the typescript type.
 */
export function ReadOnly<T extends Key>(obj: T): ReadOnly<T> {
    return obj as ReadOnly<T>
}