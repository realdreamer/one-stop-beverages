import { useMemo } from 'react';
import format from 'date-fns/format';

import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../App/Context';

import './index.css';

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
  headerClassName?: string;
  className?: string;
}

const defaultColumns: Column[] = [
  {
    id: 'id',
    title: 'ID',
    headerClassName: 'invoice-id-cell',
  },
  {
    id: 'date',
    title: 'Date',
    headerClassName: 'invoice-date-cell',
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

const revenueColumns: Column[] = [
  {
    id: 'total_invoice',
    title: 'Total Invoice',
    headerClassName: 'invoice-revenue-cell',
    className: 'text-align-right',
  },
];

const marginColumns: Column[] = [
  {
    id: 'total_margin',
    title: 'Total Margin',
    headerClassName: 'invoice-margin-cell',
    className: 'text-align-right',
  },
];

// id, date, costumer name, region, invoice total (or total margin, depending on switcher value).

export default function Invoices() {
  const { data, loading, error } = useFetch<Invoice[]>(url);
  const {
    state: { valueType },
  } = useAppContext();

  const latestInvoices = useMemo(
    () =>
      data
        ?.sort((a, b) => (b.date > a.date ? 1 : -1))
        .slice(0, 15)
        .map((invoice) => ({
          ...invoice,
          date: format(new Date(invoice.date), 'dd-MMM-yyyy'),
          total_invoice: invoice.total_invoice.toFixed(2),
          total_margin: invoice.total_margin.toFixed(2),
        })),
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
    <section className="tile latest-invoices-section">
      <h3 className="tile-header">Latest Invoices</h3>
      <p className="tile-description">List of the 15 latestinvoices by date</p>
      <div className="tile-content">
        <table className="table">
          <thead>
            <tr>
              {columns.map(({ id, title, headerClassName = '' }) => (
                <th key={id} className={`table-head ${headerClassName}`}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {latestInvoices?.map((invoice) => (
              <tr key={invoice.id}>
                {columns.map(({ id, className = '' }) => (
                  <td
                    key={`${id}-${invoice.id}`}
                    className={`table-cell ${className}`}
                  >
                    {invoice[id as keyof Invoice]}
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
