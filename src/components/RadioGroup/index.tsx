import React from 'react';

export interface Option {
  value: string;
  label: string;
}

interface Props {
  id?: string;
  className?: string;
  name?: string;
  options: Option[];
  onSelection?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
}

export default function RadioGroup({
  id = 'radio-group-selection',
  className = '',
  name = 'radio-group-selection',
  options,
  onSelection,
  selectedValue,
}: Props) {
  return (
    <div id={id} role="radiogroup" className={className}>
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
            <label className="radio-label" htmlFor={inputId}>
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
