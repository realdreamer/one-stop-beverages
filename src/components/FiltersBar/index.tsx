import RadioGroupFilter from '../RadioGroupFilter';

import { useAppContext } from '../App/Context';
import { ValueTypeFilter, PeriodSelectionFilter } from '../../types';

import './index.css';

const periodSelectionoptions = [
  {
    value: PeriodSelectionFilter.weekly,
    label: 'Weekly',
  },
  {
    value: PeriodSelectionFilter.monthly,
    label: 'Monthly',
  },
];

const valueTypeSelectionOptions = [
  {
    value: ValueTypeFilter.revenues,
    label: 'Revenues',
  },
  {
    value: ValueTypeFilter.margins,
    label: 'Margins',
  },
];

export default function FiltersBar() {
  const { state, onCreateFilterChange } = useAppContext();

  return (
    <div className="filters-bar">
      <RadioGroupFilter
        value={state.period}
        onSelection={onCreateFilterChange('period')}
        title="Period Selector"
        options={periodSelectionoptions}
      />
      <RadioGroupFilter
        value={state.valueType}
        onSelection={onCreateFilterChange('valueType')}
        title="Value Type Selector"
        options={valueTypeSelectionOptions}
      />
    </div>
  );
}
