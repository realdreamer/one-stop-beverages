import { ValueTypeFilter } from './types';

export const COST_VALUE_MAPPER = {
  [ValueTypeFilter.margins]: 'total_margin',
  [ValueTypeFilter.revenues]: 'total_revenue',
};
