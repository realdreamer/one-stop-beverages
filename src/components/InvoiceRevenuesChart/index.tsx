import { useMemo } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';

import useFetch from '../../hooks/useFetch';

interface Revenue {
  week?: string;
  month?: string;
  start_date: Date;
  end_date: Date;
  invoices_count: number;
  total_margin: number;
  total_revenue: number;
}

const url = 'http://localhost:3001/api/revenues/monthly';

interface SeriesData {
  x: string;
  y: number;
}

export default function InvoiceRevenuesChart() {
  const { data = [], loading, error } = useFetch<Revenue[]>(url);

  const sortDataByDate = useMemo(
    () => data?.sort((a, b) => (a.start_date > b.start_date ? 1 : -1)),
    [data],
  );

  const enhanceDataForChart = useMemo((): SeriesData[] => {
    if (!sortDataByDate) return [];

    return sortDataByDate.reduce((prev: SeriesData[], next, index) => {
      prev.push({
        x: next?.month || next?.week || 'Month',
        y: (prev[index - 1]?.y || 0) + next.total_revenue,
      });
      return prev;
    }, []);
  }, [sortDataByDate]);

  if (loading) return <p>Loading...!</p>;

  if (error) return <p>Something went wrong..!</p>;

  if (!enhanceDataForChart || enhanceDataForChart.length === 0)
    return <p>No Data</p>;

  const chartData: Serie[] = [
    {
      id: 'hello',
      data: enhanceDataForChart,
    },
  ];

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
