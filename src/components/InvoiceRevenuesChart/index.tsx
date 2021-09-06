import { useEffect, useMemo } from 'react';

import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/Context';
import { PeriodSelectionFilter, ValueTypeFilter } from '../../types';
import LineChart from '../LineChart';
import useWindowSize from '../../hooks/useWindowSize';

interface Revenue {
  week?: string;
  month?: string;
  start_date: Date;
  end_date: Date;
  invoices_count: number;
  total_margin: number;
  total_revenue: number;
}
interface SeriesData {
  x: string;
  y: number;
}

const BASE_URL = 'http://localhost:3001/api/revenues';

export default function InvoiceRevenuesChart() {
  const {
    state: { period, valueType },
  } = useAppContext();
  const url = `${BASE_URL}/${period}`;
  const { data = [], loading, error, refetch } = useFetch<Revenue[]>(url);
  const { width = 0 } = useWindowSize();

  useEffect(() => {
    refetch && refetch(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const selectedPeriod =
    period === PeriodSelectionFilter.monthly ? 'month' : 'week';

  const selectedValueType =
    valueType === ValueTypeFilter.margins ? 'total_margin' : 'total_revenue';

  const sortDataByDate = useMemo(
    () => data?.sort((a, b) => (a.start_date > b.start_date ? 1 : -1)),
    [data],
  );

  const enhanceDataForChart = useMemo((): SeriesData[] => {
    if (!sortDataByDate) return [];

    return sortDataByDate.reduce((prev: SeriesData[], next, index) => {
      prev.push({
        x: next?.[selectedPeriod] || '',
        y: (prev[index - 1]?.y || 0) + next[selectedValueType],
      });
      return prev;
    }, []);
  }, [sortDataByDate, selectedPeriod, selectedValueType]);

  const totalDataPoints = enhanceDataForChart.length;

  const weeklyDataPointsLimit =
    width < 480
      ? 12
      : width >= 480 && width < 768
      ? 20
      : width >= 768 && width < 1023
      ? 36
      : totalDataPoints;

  console.log(weeklyDataPointsLimit);

  const spliceChartData =
    selectedPeriod === 'month'
      ? enhanceDataForChart
      : enhanceDataForChart.slice(
          totalDataPoints - weeklyDataPointsLimit,
          totalDataPoints,
        );

  console.log(spliceChartData);

  if (loading) return <p>Loading...!</p>;

  if (error) return <p>Something went wrong..!</p>;

  if (!enhanceDataForChart || enhanceDataForChart.length === 0)
    return <p>No Data</p>;

  return (
    <section className="chart-tile-section">
      <div className="tile">
        <h3 className="tile-header">{`Cumulative invoice ${valueType}`}</h3>
        {selectedPeriod === 'week' && (
          <p>Displaying only the most recent {weeklyDataPointsLimit} weeks</p>
        )}
        <div className="tile-content">
          <div className="chart">
            <LineChart
              data={[
                {
                  id: `${valueType.toUpperCase()} FOR ${selectedPeriod.toUpperCase()}`,
                  data: spliceChartData,
                },
              ]}
              legend={{
                bottom: selectedPeriod.toUpperCase(),
                left: valueType.toUpperCase(),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
