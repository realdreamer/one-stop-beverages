import useFetch from '../../hooks/useFetch';

interface Customer {
  customer_id: number;
  customer_name: string;
  total_revenue: number;
  total_margin: number;
  invoices_count: number;
}

// with their name, their region, the number of invoices at their
// names and the total revenue(or total margin, depending on switcher value).

const url = 'http://localhost:3001/api/customers/revenues';

export default function BestCustomers() {
  const { data, loading, error } = useFetch<Customer[]>(url);

  if (loading) return <p>Loading...!</p>;

  if (error) return <p>Something went wrong..!</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Date</th>
          <th>Customer Name</th>
          <th>Region</th>
          <th>Total Invoice</th>
        </tr>
      </thead>
      <tbody>
        {data?.map(
          ({
            customer_id,
            customer_name,
            total_revenue,
            total_margin,
            invoices_count,
          }) => (
            <tr key={customer_id}>
              <td>{customer_id}</td>
              <td>{customer_name}</td>
              <td>{total_revenue}</td>
              <td>{total_margin}</td>
              <td>{invoices_count}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
