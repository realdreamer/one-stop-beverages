import React from 'react';

import { useReducer } from 'react';

import reducer, { initialState } from './reducer';

import RadioGroupFilter from '../RadioGroupFilter';

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
  const [state, dispatch] = useReducer(reducer, initialState);

  function handlePeriodSelection(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'period',
      payload: {
        value: event?.target.value,
      },
    });
  }

  function handleValueTypeSelection(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    dispatch({
      type: 'valueType',
      payload: {
        value: event?.target.value,
      },
    });
  }

  return (
    <div className="filters-bar">
      <RadioGroupFilter
        value={state.period}
        onSelection={handlePeriodSelection}
        title="Period Selector"
        options={periodSelectionoptions}
      />
      <RadioGroupFilter
        value={state.valueType}
        onSelection={handleValueTypeSelection}
        title="Value Type Selector"
        options={valueTypeSelectionOptions}
      />
    </div>
  );
}
