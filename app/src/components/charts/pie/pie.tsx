import { toPlaces } from "@src/utils/number"
import ReactApexChart from "react-apexcharts"
import { PieProps } from "./type"

export function PieChart<Value>(props: PieProps<Value>) {
  const { data, value, label, color, tooltip, dataLabel, ...opts } = props

  const keys = Object.keys(data)
  const labels = keys.map(lb => label(lb, data[lb]))
  const values = keys.map(lb => value(lb, data[lb]))

  const colors = color ? keys.map(label => color(label)) : undefined

  return <ReactApexChart type="pie" series={values} options={{
    labels,
    legend: {
      position: "bottom"
    },
    colors,
    tooltip: {
      y: {
        formatter(val, opts?) {
          const index: number = opts.seriesIndex
          if (tooltip) {
            return tooltip(keys[index], data[keys[index]])
          }
          return val.toString()
        },
      }
    },
    dataLabels: {
      formatter(val, opts?) {
        const index: number = opts.seriesIndex
        if (dataLabel) {
          return dataLabel(keys[index], data[keys[index]])
        }
        return toPlaces(val as number, 2) + "%"
      },
    },
    chart: {
      foreColor: opts.foreColor
    }
  }} />
}