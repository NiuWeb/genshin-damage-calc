export type ChartData<Value> = {
  [label: string]: Value
}
export type ChartDataMap<Value, Result> = (label: string, value: Value) => Result

export interface LineProps {
  title?: string
  data: ChartData<number[]>
  label: ChartDataMap<number[], string>
  color?(label: string): string
  tooltip?(label: string, value: number): string
  dataLabel?(label: string, value: number): string

  foreColor?: string
}