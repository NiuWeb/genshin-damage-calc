export type ChartData<Value> = {
    [label: string]: Value
}
export type ChartDataMap<Value, Result> = (label: string, value: Value) => Result


export interface BarProps<Value> {
    title?: string
    data: ChartData<Value>
    value: ChartDataMap<Value, number>
    label: ChartDataMap<Value, string>
    color?(label: string): string
    tooltip?(label: string, value: Value): string
    dataLabel?(label: string, value: Value): string

    xaxis?(value: number | string): string

    horizontal?:boolean
    foreColor?: string
}