export type ChartData<Value> = {
  [label: string]: Value
}
export type ChartDataMap<Value, Result> = (label: string, value: Value) => Result

export interface LineProps {
  title?: string
  data: ChartData<number[]> | [number, number][]
  label?: ChartDataMap<number[], string> | string
  color?(label: string): string
  tooltip?(label: string, value: number): string
  xtooltip?(label: string, value: number): string
  dataLabel?(label: string, value: number): string
  axis?: {
    xtitle?: string
    ytitle?: string
  }
  foreColor?: string
}