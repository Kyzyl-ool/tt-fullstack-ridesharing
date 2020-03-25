import React, { useState } from 'react';
import './Input.scss';

type InputPlaceholderType = 'default' | 'subscript';

interface IInput {
  defaultValue?: string;
  className?: string;
  placeholderType?: InputPlaceholderType;
  icon?: React.ReactElement;
  id: string;
  placeholderText: string;
  onChange?: (value: string) => void;
  validate?: (string) => string;
}

export const Input = ({
  placeholderType = 'default',
  defaultValue = '',
  className = '',
  icon,
  id,
  placeholderText,
  onChange = () => {},
  validate
}: IInput) => {
  const [value, setValue] = useState<string>(defaultValue);

  const onInputChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
    validate && validate(e.target.value);
  };

  return (
    <div className={`rsh-input ${className}`}>
      {icon && (
        <div className={'rsh-input__icon'}>
          <label form={id}>{icon}</label>
        </div>
      )}
      <input
        id={id}
        value={value}
        onChange={e => onInputChange(e)}
        placeholder={placeholderType === 'default' && placeholderText}
        className={`rsh-input__form ${icon ? 'rsh-input__form--with-icon' : ''}`}
        type={'text'}
      />
      {placeholderType === 'subscript' && <caption className={'rsh-input__caption'}>{placeholderText}</caption>}
    </div>
  );
};
