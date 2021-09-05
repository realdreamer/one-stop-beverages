import { useReducer } from 'react';

import reducer, { initialState, FiltersState } from './reducer';

type EventType = 'period' | 'valueType';

export interface UseFiltersState {
  state: FiltersState;
  onCreateFilterChange: (
    eventType: EventType,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function useFilters(): UseFiltersState {
  const [state, dispatch] = useReducer(reducer, initialState);

  function createDispatch(eventType: EventType) {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      dispatch({
        type: eventType,
        payload: {
          value: event?.target.value,
        },
      });
    };
  }

  return {
    state,
    onCreateFilterChange: createDispatch,
  };
}
