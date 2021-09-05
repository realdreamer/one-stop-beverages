import './index.css';

import Invoices from '../Invoices';
import BestCustomers from '../BestCustomers';
import ProductCategories from '../ProductCategoriesChart';
import InvoiceRevenuesChart from '../InvoiceRevenuesChart';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>One Stop Beverages</h1>
      </header>
      <Invoices />
      <BestCustomers />
      <ProductCategories />
      <InvoiceRevenuesChart />
    </div>
  );
}

export default App;
