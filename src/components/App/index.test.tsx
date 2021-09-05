import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '.';

test('renders app title', () => {
  render(<App />);
  screen.getByText(/One Stop Beverages/i);
});
