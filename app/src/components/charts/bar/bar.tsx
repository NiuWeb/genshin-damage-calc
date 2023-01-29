import { toPlaces } from "@src/utils/number"
import ReactApexChart from "react-apexcharts"
import { BarProps } from "./type"

export function BarChart<Value>(props: BarProps<Value>) {
  const { data, value, label, color, tooltip, dataLabel, ...opts } = props

  const keys = Object.keys(data)
  const labels = keys.map(lb => label(lb, data[lb]))
  const values = keys.map(lb => value(lb, data[lb]))

  const colors = color ? keys.map(label => color(label)) : undefined

  return <ReactApexChart type="bar"
    series={[{
      name: props.title,
      data: values
    }]}
    options={{
      legend: {
        position: "bottom"
      },
      title: {
        text: opts.title,
      },
      plotOptions: {
        bar: {
          horizontal: props.horizontal
        }
      },
      colors,
      tooltip: {
        y: {
          formatter(val, opts?) {
            const index: number = opts.dataPointIndex
            if (tooltip) {
              return tooltip(keys[index], data[keys[index]])
            }
            return val.toString()
          },
        }
      },
      dataLabels: {
        formatter(val, opts?) {
          const index: number = opts.dataPointIndex
          if (dataLabel) {
            return dataLabel(keys[index], data[keys[index]])
          }
          return toPlaces(val as number, 2) + "%"
        },
      },
      chart: {
        foreColor: opts.foreColor
      },
      xaxis: {
        categories: labels,
        decimalsInFloat: 8,
        labels: {
          formatter: props.xaxis ? (val) => (
            props.xaxis?.(val) || val
          ) : undefined,
        }
      },
    }} />
}