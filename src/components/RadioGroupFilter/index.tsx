import React from 'react';
import { FilterValues } from '../../types';

import RadioGroup, { Option } from '../RadioGroup';

import './index.css';
interface Props {
  title: string;
  value: FilterValues;
  options: Option[];
  onSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/^-*|-*$/g, '')
    .replace(/-{2,}/g, '-');
}

export default function RadioGroupFilter({
  value,
  onSelection,
  title,
  options,
}: Props) {
  return (
    <div className="radio-group-filter">
      <h4>{title}</h4>
      <RadioGroup
        options={options}
        name={slugify(title)}
        id={slugify(title)}
        selectedValue={value}
        onSelection={onSelection}
      />
    </div>
  );
}
