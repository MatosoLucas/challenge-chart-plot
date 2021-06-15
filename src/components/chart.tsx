import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import lodash from 'lodash'
import { Data, DataData, DataSpan, DataStart } from '../App'


export default function Chart({ chartdata }: { chartdata: Data[] }) {
  const [dateItem] = chartdata.filter((it) => it.type === "span") as DataSpan[]

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
      categories: [
        new Date(dateItem.begin).toDateString(),
        new Date(dateItem.end).toDateString(),
      ],
      title: {
        text: "date/time"
      }
    },
    yaxis: {
      min: 0,
      title: {
        text: "response time"
      }
    },
    grid: {
      show: false,
    }
  }

  const header = lodash.first(chartdata.filter((it) => it.type === "start") as DataStart[]);

  if (!header) {
    throw new Error("Missing start event");
  }

  const data = chartdata.filter((it) => it.type === "data");

  const groups = lodash.groupBy(data, (item: DataData) => {
    const key: Array<string> = [];

    header.group.forEach((group) => {
      key.push(item[group]);
    });

    return key.join("/");
  });

  const getGraph = (prop: string) =>
    lodash.map(groups, (value, key) => ({
      data: value.map((it: any) => (it[prop])),
      name: key
    }),
    );

  const series = lodash.flatMap(header.select.map((select: string) =>
    getGraph(select).map((it) => (
      {
        ...it,
        name: `${it.name} (${select})`,
      }))
  ))

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="350px"
      style={{ width: '100%' }}
    />
  )
}