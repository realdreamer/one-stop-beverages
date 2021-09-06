import './index.css';

import Invoices from '../Invoices';
import BestCustomers from '../BestCustomers';
import ProductCategories from '../ProductCategoriesChart';
import InvoiceRevenuesChart from '../InvoiceRevenuesChart';
import Header from '../Header';

import AppContext from './Context';

import useFilters from '../FiltersBar/useFilters';

function App() {
  const { state, onCreateFilterChange } = useFilters();
  return (
    <AppContext.Provider value={{ state, onCreateFilterChange }}>
      <div className="app">
        <Header />
        <main className="main">
          <Invoices />
          <BestCustomers />
          <ProductCategories />
          <InvoiceRevenuesChart />
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
