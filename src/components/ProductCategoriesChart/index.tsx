import { BarDatum } from '@nivo/bar';
import { useMemo } from 'react';

import useFetch from '../../hooks/useFetch';
import BarChart from '../BarChart';
import { COST_VALUE_MAPPER } from '../../consts';
import { useAppContext } from '../App/Context';
import TileStateFeedback from '../TileStateFeedback';
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

  const { data = [], loading, error } = useFetch<CategoryRevenue[]>(url);

  const productCategoriesData = useMemo(
    () =>
      data.map((productCategory) => ({
        ...productCategory,
        total_margin: parseFloat(productCategory.total_margin.toFixed(2)),
        total_revenue: parseFloat(productCategory.total_revenue.toFixed(2)),
      })),
    [data],
  );

  return (
    <section className="chart-tile-section">
      <div className="tile">
        <h3 className="tile-header">{`Total ${valueType} per products categories`}</h3>
        <div className="tile-content">
          <TileStateFeedback
            loading={loading}
            error={error}
            empty={!productCategoriesData.length}
          >
            <div className="chart">
              <BarChart
                data={productCategoriesData}
                keys={[COST_VALUE_MAPPER[valueType]]}
                indexBy="category_name"
              />
            </div>
          </TileStateFeedback>
        </div>
      </div>
    </section>
  );
}
