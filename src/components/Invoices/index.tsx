import { useMemo } from 'react';
import format from 'date-fns/format';

import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/Context';

interface Product {
  product_id: number;
  product_name: string;
  product_category: string;
  unit_price: number;
  quantity: number;
  total_line: number;
  total_margin: number;
}

interface Invoice {
  id: number;
  customer_id: number;
  customer_name: string;
  date: Date;
  invoice_lines: Product[];
  total_invoice: number;
  total_margin: number;
  region: string;
}

const url = 'http://localhost:3001/api/invoices';

interface Column {
  id: keyof Invoice;
  title: string;
}

const defaultColumns: Column[] = [
  {
    id: 'id',
    title: 'ID',
  },
  {
    id: 'date',
    title: 'Date',
  },
  {
    id: 'customer_name',
    title: 'Customer Name',
  },
  {
    id: 'region',
    title: 'Region',
  },
];

const revenueColumns = [
  {
    id: 'total_invoice',
    title: 'Total Invoice',
  },
];

const marginColumns = [
  {
    id: 'total_margin',
    title: 'Total Margin',
  },
];

// id, date, costumer name, region, invoice total (or total margin, depending on switcher value).

export default function Invoices() {
  const { data, loading, error } = useFetch<Invoice[]>(url);
  const {
    state: { valueType },
  } = useAppContext();

  const latestInvoices = useMemo(
    () => data?.sort((a, b) => (b.date > a.date ? 1 : -1)).slice(0, 15),
    [data],
  );

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
        {latestInvoices?.map((invoice) => (
          <tr key={invoice.id}>
            {columns.map(({ id }) => (
              <td key={`${id}-${invoice.id}`}>
                {id === 'date'
                  ? format(new Date(invoice[id]), 'dd-MMM-yyyy')
                  : invoice[id as keyof Invoice]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
