import { useEffect, useMemo } from 'react';

import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/Context';
import { PeriodSelectionFilter, ValueTypeFilter } from '../../types';
import LineChart from '../LineChart';

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

  if (loading) return <p>Loading...!</p>;

  if (error) return <p>Something went wrong..!</p>;

  if (!enhanceDataForChart || enhanceDataForChart.length === 0)
    return <p>No Data</p>;

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <LineChart
        data={[
          {
            id: `${valueType.toUpperCase()} FOR ${selectedPeriod.toUpperCase()}`,
            data: enhanceDataForChart,
          },
        ]}
        legend={{
          bottom: selectedPeriod.toUpperCase(),
          left: valueType.toUpperCase(),
        }}
      />
    </div>
  );
}
