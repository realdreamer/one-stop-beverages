export interface FiltersState {
  period: string;
  valueType: string;
}

export const initialState = {
  period: 'monthly',
  valueType: 'revenues',
};

interface Payload {
  value: string;
}

type Action =
  | { type: 'period'; payload: Payload }
  | { type: 'valueType'; payload: Payload };

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
