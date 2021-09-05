import React from 'react';

import { UseFiltersState } from '../FiltersBar/useFilters';
import { initialState } from '../FiltersBar/reducer';

const AppContext = React.createContext<UseFiltersState>({
  state: initialState,
  onCreateFilterChange: () => () => {},
});

export const useAppContext = () => React.useContext(AppContext);

export default AppContext;
