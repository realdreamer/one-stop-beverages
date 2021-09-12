import { useMemo } from 'react';
import { Revenue } from '.';
import useWindowSize from '../../hooks/useWindowSize';
import { PeriodSelectionFilter, ValueTypeFilter } from '../../types';

interface SeriesData {
  x: string;
  y: number;
}

export default function useChartData(
  data: Revenue[],
  period: PeriodSelectionFilter,
  valueType: ValueTypeFilter,
) {
  const { width = 0 } = useWindowSize();
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

    return sortDataByDate.reduce((prev: SeriesData[], next: Revenue, index) => {
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

  const spliceChartData =
    selectedPeriod === 'month'
      ? enhanceDataForChart
      : enhanceDataForChart.slice(
          totalDataPoints - weeklyDataPointsLimit,
          totalDataPoints,
        );

  return {
    data: spliceChartData,
    selectedPeriod,
    weeklyDataPointsLimit,
  };
}
