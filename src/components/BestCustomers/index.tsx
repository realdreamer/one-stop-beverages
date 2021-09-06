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

const revenueColumns = [
  {
    id: 'total_revenue',
    title: 'Total Revenue',
  },
];

const marginColumns = [
  {
    id: 'total_margin',
    title: 'Total Margin',
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

  if (loading) return <p>Loading...!</p>;

  if (error) return <p>Something went wrong..!</p>;

  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ id, title }) => (
            <th key={id}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((customer) => (
          <tr key={customer.customer_id}>
            {columns.map(({ id }) => (
              <td key={`${id}-${customer.customer_id}`}>
                {customer[id as keyof Customer]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
