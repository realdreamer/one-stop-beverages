import './index.css';

import Invoices from '../Invoices';
import BestCustomers from '../BestCustomers';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>One Stop Beverages</h1>
      </header>
      <Invoices />
      <BestCustomers />
    </div>
  );
}

export default App;
