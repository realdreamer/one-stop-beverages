import { ResponsiveLine, Serie } from '@nivo/line';

interface Legend {
  bottom: string;
  left: string;
}

interface Props {
  data: Serie[];
  legend: Legend;
}

export default function LineChart({ data, legend }: Props) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 24, right: 100, bottom: 100, left: 100 }}
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
        tickRotation: 90,
        legend: legend.bottom,
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: legend.left,
        legendOffset: -70,
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
          anchor: 'bottom',
          direction: 'row',
          translateX: 0,
          translateY: 80,
          itemsSpacing: 0.85,
          itemWidth: 94,
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
  );
}
