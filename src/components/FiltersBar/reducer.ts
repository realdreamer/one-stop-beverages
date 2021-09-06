import { ValueTypeFilter, PeriodSelectionFilter } from '../../types';
export interface FiltersState {
  period: PeriodSelectionFilter;
  valueType: ValueTypeFilter;
}

export const initialState = {
  period: PeriodSelectionFilter.monthly,
  valueType: ValueTypeFilter.revenues,
};

interface Payload {
  value: PeriodSelectionFilter;
}

interface ValueTypePayload {
  value: ValueTypeFilter;
}

type Action =
  | { type: 'period'; payload: Payload }
  | { type: 'valueType'; payload: ValueTypePayload };

export default function reducer(
  state: FiltersState = initialState,
  action: Action,
): FiltersState {
  if (action.type === 'period') {
    return {
      ...state,
      period: action.payload.value,
    };
  }

  if (action.type === 'valueType') {
    return {
      ...state,
      valueType: action.payload.value,
    };
  }

  return state;
}
