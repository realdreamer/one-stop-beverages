export enum ValueTypeFilter {
  'margins' = 'margins',
  'revenues' = 'revenues',
}

export enum PeriodSelectionFilter {
  'monthly' = 'monthly',
  'weekly' = 'weekly',
}

export type FilterValues = ValueTypeFilter | PeriodSelectionFilter;
