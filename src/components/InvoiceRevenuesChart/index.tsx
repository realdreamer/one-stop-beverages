import { useEffect } from 'react';

import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/Context';
// import { PeriodSelectionFilter, ValueTypeFilter } from '../../types';
import LineChart from '../LineChart';
// import useWindowSize from '../../hooks/useWindowSize';
import TileStateFeedback from '../TileStateFeedback';
import useChartData from './useChartData';

export interface Revenue {
  week?: string;
  month?: string;
  start_date: Date;
  end_date: Date;
  invoices_count: number;
  total_margin: number;
  total_revenue: number;
}
// interface SeriesData {
//   x: string;
//   y: number;
// }

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/revenues`;

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

  const {
    data: spliceChartData,
    selectedPeriod,
    weeklyDataPointsLimit,
  } = useChartData(data, period, valueType);

  return (
    <section className="chart-tile-section">
      <div className="tile">
        <h3 className="tile-header">{`Cumulative invoice ${valueType}`}</h3>
        {selectedPeriod === 'week' && (
          <p>Displaying only the most recent {weeklyDataPointsLimit} weeks</p>
        )}
        <div className="tile-content">
          <TileStateFeedback
            loading={loading}
            error={error}
            empty={spliceChartData.length === 0}
          >
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
          </TileStateFeedback>
        </div>
      </div>
    </section>
  );
}
