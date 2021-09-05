import { useMemo } from 'react';
import format from 'date-fns/format';

import useFetch from '../../hooks/useFetch';

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

// id, date, costumer name, region, invoice total (or total margin, depending on switcher value).

export default function Invoices() {
  const { data, loading, error } = useFetch<Invoice[]>(url);

  const latestInvoices = useMemo(
    () => data?.sort((a, b) => (b.date > a.date ? 1 : -1)).slice(0, 15),
    [data],
  );

  if (loading) return <p>Loading...!</p>;

  if (error) return <p>Something went wrong..!</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Customer Name</th>
          <th>Region</th>
          <th>Total Invoice</th>
          <th>Total Margin</th>
        </tr>
      </thead>
      <tbody>
        {latestInvoices?.map(
          ({
            id,
            customer_name,
            region,
            date,
            total_invoice,
            total_margin,
          }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{customer_name}</td>
              <td>{region}</td>
              <td>{format(new Date(date), 'dd-MMM-yyyy')}</td>
              <td>{total_invoice}</td>
              <td>{total_margin}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
