import { useMemo } from 'react';

import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/Context';

interface Customer {
  customer_id: number;
  customer_name: string;
  total_revenue: number;
  total_margin: number;
  invoices_count: number;
  region: string;
}

interface Column {
  id: keyof Customer;
  title: string;
  className?: string;
}

const defaultColumns: Column[] = [
  {
    id: 'customer_name',
    title: 'Customer Name',
  },
  {
    id: 'region',
    title: 'Region',
  },
  {
    id: 'invoices_count',
    title: 'Total Invoices',
  },
];

const revenueColumns: Column[] = [
  {
    id: 'total_revenue',
    title: 'Total Revenue',
    className: 'text-align-right',
  },
];

const marginColumns: Column[] = [
  {
    id: 'total_margin',
    title: 'Total Margin',
    className: 'text-align-right',
  },
];

// with their name, their region, the number of invoices at their
// names and the total revenue(or total margin, depending on switcher value).

const url = 'http://localhost:3001/api/customers/revenues';

export default function BestCustomers() {
  const { data, loading, error } = useFetch<Customer[]>(url);
  const {
    state: { valueType },
  } = useAppContext();

  const columns = useMemo(() => {
    const valueColumn =
      valueType === 'revenues' ? revenueColumns : marginColumns;
    return [...defaultColumns, ...valueColumn];
  }, [valueType]);

  const enhanceData = useMemo(
    () =>
      data?.map((customer) => ({
        ...customer,
        total_margin: customer.total_margin.toFixed(2),
        total_revenue: customer.total_revenue.toFixed(2),
      })),
    [data],
  );

  if (loading) return <p>Loading...!</p>;

  if (error) return <p>Something went wrong..!</p>;

  return (
    <section className="tile best-customers-section">
      <h3 className="tile-header">Best Customers</h3>
      <div className="tile-content">
        <table className="table">
          <thead>
            <tr>
              {columns.map(({ id, title }) => (
                <th key={id} className="table-head">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enhanceData?.map((customer) => (
              <tr key={customer.customer_id}>
                {columns.map(({ id, className }) => (
                  <td
                    key={`${id}-${customer.customer_id}`}
                    className={`${className} table-cell`}
                  >
                    {customer[id as keyof Customer]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
