import { useMemo } from "react"
import ReactApexChart from "react-apexcharts"
import { LineProps } from "./type"

export function LineChart(props: LineProps) {
  const { data, label, color, xtooltip, tooltip, axis, ...opts } = props


  const { keys, series, colors } = useMemo(() => {
    const isArr = Array.isArray(data)

    if (isArr) {
      const name = typeof label === "string" ? label : "data"
      return {
        keys: [name],
        series: [{ name, data }],
        colors: undefined
      }
    }

    const keys = Object.keys(data)
    const series = Object.entries(data).map(([lb, data]) => ({
      name: typeof label === "function" ? label(lb, data) : lb,
      data
    }))

    const colors = color && !isArr ? keys.map(label => color(label)) : undefined
    return { keys, series, colors }

  }, [data, label, color])

  return <ReactApexChart type="line" series={series} options={{
    legend: {
      position: "bottom"
    },
    colors,
    xaxis: {
      title: {
        text: axis?.xtitle,
        offsetY: 128
      }
    },
    yaxis: {
      decimalsInFloat: 2,
      title: {
        text: axis?.ytitle,
      }
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
      },
      x: {
        formatter(val, opts?) {
          const index: number = opts.seriesIndex
          if (xtooltip) {
            return xtooltip(keys[index], val)
          }
          return val.toString()
        }
      }
    },
    chart: {
      foreColor: opts.foreColor
    }
  }} />
}