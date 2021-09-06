import { ResponsiveBar } from '@nivo/bar';
import { CategoryRevenue } from '../ProductCategoriesChart';

interface Props {
  data: CategoryRevenue[];
  keys: string[];
  indexBy: string;
}

export default function BarChart({ data, keys, indexBy }: Props) {
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={indexBy}
      margin={{ top: 24, right: 24, bottom: 100, left: 100 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      layout="horizontal"
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Product Category',
        legendPosition: 'middle',
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Beverages',
        legendPosition: 'middle',
        legendOffset: -80,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          itemHeight: 20,
          itemWidth: 80,
          translateY: 80,
          dataFrom: 'keys',
          translateX: 0,
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
