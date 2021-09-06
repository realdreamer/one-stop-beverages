import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '.';

import AppContext from '../App/Context';

import { initialState } from '../FiltersBar/reducer';

describe('Header', () => {
  const onChange = () => jest.fn();
  it('should renders app title', () => {
    render(
      <AppContext.Provider
        value={{
          state: initialState,
          onCreateFilterChange: onChange,
        }}
      >
        <Header />
      </AppContext.Provider>,
    );
    screen.getByText(/One Stop Beverages/i);
  });

  it('should render filter options', () => {
    render(
      <AppContext.Provider
        value={{
          state: initialState,
          onCreateFilterChange: onChange,
        }}
      >
        <Header />
      </AppContext.Provider>,
    );
    screen.getByText(/period selector/i);
    screen.getByText(/value type selector/i);
  });

  it('should render period selector with default values selected', () => {
    render(
      <AppContext.Provider
        value={{
          state: initialState,
          onCreateFilterChange: onChange,
        }}
      >
        <Header />
      </AppContext.Provider>,
    );
    expect(screen.getByLabelText(/Weekly/i)).not.toBeChecked();
    expect(screen.getByLabelText(/monthly/i)).toBeChecked();
  });
});
