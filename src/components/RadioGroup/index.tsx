import React from 'react';

import { FilterValues } from '../../types';

import './index.css';
export interface Option {
  value: any;
  label: string;
}

interface Props {
  id?: string;
  className?: string;
  name?: string;
  options: Option[];
  onSelection?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue: FilterValues;
}

export default function RadioGroup({
  id = 'radio-group-selection',
  className = '',
  name = 'radio-group-selection',
  options,
  onSelection,
  selectedValue,
}: Props) {
  const classNames = `radio-group ${className}`;
  return (
    <div id={id} role="radiogroup" className={classNames}>
      {options.map(({ value, label }, index) => {
        const inputId = `radiogroup-${name}-${index}`;
        return (
          <div className="radio" key={value}>
            <input
              type="radio"
              name={name}
              id={inputId}
              value={value}
              className="radio-input"
              onChange={onSelection}
              checked={selectedValue === value}
            />
            <label htmlFor={inputId}>
              <span className="radio-faux">
                <div className="radio-circle" />
              </span>
              <span className="radio-label">{label}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
