import React from 'react';

import RadioGroup, { Option } from '../RadioGroup';

interface Props {
  title: string;
  value: string;
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
      <h2>{title}</h2>
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
