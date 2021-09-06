import { BarDatum } from '@nivo/bar';

import useFetch from '../../hooks/useFetch';
import BarChart from '../BarChart';
import { COST_VALUE_MAPPER } from '../../consts';
import { useAppContext } from '../App/Context';

export interface CategoryRevenue extends BarDatum {
  category_name: string;
  total_revenue: number;
  total_margin: number;
}

const url = 'http://localhost:3001/api/categories/revenues';

export default function ProductCategories() {
  const {
    state: { valueType },
  } = useAppContext();

  const { data, loading, error } = useFetch<CategoryRevenue[]>(url);

  if (loading) return <p>Loading...!</p>;

  if (error) return <p>Something went wrong..!</p>;

  if (!data || data.length === 0) return <p>No Data</p>;

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <BarChart
        data={data}
        keys={[COST_VALUE_MAPPER[valueType]]}
        indexBy="category_name"
      />
    </div>
  );
}
