import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import lodash from 'lodash'
import { Data, DataData, DataEnd, DataSpan, DataStart } from '../App'
import { useToast } from '@chakra-ui/react';


export default function Chart({ chartdata }: { chartdata: Data[] }) {

  const toast = useToast()

  const header = lodash.first(chartdata.filter((it) => it.type === "start") as DataStart[]);

  if (!header) {
    throw toast({ title: "Missing a start event!", status: "error", isClosable: true, duration: 9000 });
  }

  const [endItem] = chartdata.filter((it) => it.type === 'end') as DataEnd[]

  const normalCategory = [new Date(header.timestamp).toDateString(), new Date(endItem.timestamp).toDateString()]

  const [dateItem] = chartdata.filter((it) => it.type === "span") as DataSpan[]

  let data: Data[] = []

  if (dateItem) {
    data = chartdata.filter((it) => it.type === "data" && it.timestamp >= dateItem.begin && it.timestamp <= dateItem.end);
  }
  else data = chartdata.filter((it) => it.type === "data");

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

  const spanCategory = dateItem ? [new Date(dateItem.begin).toDateString(), new Date(dateItem.end).toDateString()] : null

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
      categories: dateItem ? spanCategory : normalCategory,
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