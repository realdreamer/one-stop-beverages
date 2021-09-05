import './index.css';

import Invoices from '../Invoices';
import BestCustomers from '../BestCustomers';
import ProductCategories from '../ProductCategoriesChart';
import InvoiceRevenuesChart from '../InvoiceRevenuesChart';
import Header from '../Header';

function App() {
  return (
    <div className="app">
      <Header />
      <Invoices />
      <BestCustomers />
      <ProductCategories />
      <InvoiceRevenuesChart />
    </div>
  );
}

export default App;
