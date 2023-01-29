import ReactApexChart from "react-apexcharts"
import { LineProps } from "./type"

export function LineChart(props: LineProps) {
  const { data, label, color, tooltip, ...opts } = props

  const keys = Object.keys(data)
  const series = Object.entries(data).map(([lb, data]) => ({
    name: label(lb, data),
    data
  }))

  const colors = color ? keys.map(label => color(label)) : undefined

  return <ReactApexChart type="line" series={series} options={{
    legend: {
      position: "bottom"
    },
    colors,
    yaxis: {
      decimalsInFloat: 2,
    },
    title: {
      text: opts.title,
    },
    tooltip: {
      y: {
        formatter(val, opts?) {
          const index: number = opts.seriesIndex
          if (tooltip) {
            return tooltip(keys[index], val)
          }
          return val.toString()
        },
      }
    },
    chart: {
      foreColor: opts.foreColor
    }
  }} />
}