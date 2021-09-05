import { BarDatum } from '@nivo/bar';
import useFetch from '../../hooks/useFetch';
import BarChart from '../BarChart';

export interface CategoryRevenue extends BarDatum {
  category_name: string;
  total_revenue: number;
}

const url = 'http://localhost:3001/api/categories/revenues';

export default function ProductCategories() {
  const { data, loading, error } = useFetch<CategoryRevenue[]>(url);

  if (loading) return <p>Loading...!</p>;

  if (error) return <p>Something went wrong..!</p>;

  if (!data || data.length === 0) return <p>No Data</p>;

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <BarChart data={data} keys={['total_revenue']} indexBy="category_name" />
    </div>
  );
}
