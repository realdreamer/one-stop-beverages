import FiltersBar from '../FiltersBar';
import './index.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-title-section">
        <h1 className="app-title">One Stop Beverages</h1>
      </div>
      <FiltersBar />
    </header>
  );
}
