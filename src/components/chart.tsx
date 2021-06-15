import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const options: ApexOptions = {
  tooltip: {
    enabled: false
  },
  chart: {
    id: "basic-bar",
    zoom: {
      enabled: false
    },
    
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    labels: {
      show: false,
    }
  },
  yaxis: {
    min: 0,
    max: 1,
    tickAmount: 5,
  },
  grid: {
    show: false,
  }
}

 const series = [ {
      name: "series-1",
      data: [0.3, 0.4, 0.45, 0.5, 0.49, 0.6, 0.7, 0.9]
    },
    {
    name: "asdf",
      data: [0.1, 0.6]
    }
  ]


export default function Chart() {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="250px"
      style={{width: '100%'}}
    />
  )
}