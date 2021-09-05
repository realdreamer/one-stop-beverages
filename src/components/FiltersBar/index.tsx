import RadioGroupFilter from '../RadioGroupFilter';

import { useAppContext } from '../App/Context';

const periodSelectionoptions = [
  {
    value: 'weekly',
    label: 'Weekly',
  },
  {
    value: 'monthly',
    label: 'Monthly',
  },
];

const valueTypeSelectionOptions = [
  {
    value: 'revenues',
    label: 'Revenues',
  },
  {
    value: 'margins',
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
