import { BarDatum } from '@nivo/bar';
import { useEffect, useMemo } from 'react';
import useInView from 'react-cool-inview';

// import useFetch from '../../hooks/useFetch';
import BarChart from '../BarChart';
import { COST_VALUE_MAPPER } from '../../consts';
import { useAppContext } from '../App/Context';
import TileStateFeedback from '../TileStateFeedback';
import useLazyFetch from '../../hooks/useLazyFetch';
export interface CategoryRevenue extends BarDatum {
  category_name: string;
  total_revenue: number;
  total_margin: number;
}

const url = `${process.env.REACT_APP_API_BASE_URL}/api/categories/revenues`;

export default function ProductCategories() {
  const {
    state: { valueType },
  } = useAppContext();

  const {
    data = [],
    loading,
    error,
    fetch,
  } = useLazyFetch<CategoryRevenue[]>(url);
  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // Shrink the root margin, so the animation will be triggered once the target reach a fixed amount of visible
    rootMargin: '-100px 0px',
  });

  useEffect(() => {
    console.log(inView);
    inView && fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

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
    <section className="chart-tile-section" ref={observe}>
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
