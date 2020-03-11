import React, { useState } from 'react';
import './Input.scss';

type InputPlaceholderType = 'default' | 'subscript';

interface IInput {
  className?: string;
  placeholderType?: InputPlaceholderType;
  icon?: React.ReactElement;
  id: string;
  placeholderText: string;
  onChange?: (value: string) => void;
}

export const Input = ({
  placeholderType = 'default',
  className = '',
  icon,
  id,
  placeholderText,
  onChange = () => {}
}: IInput) => {
  const [value, setValue] = useState<string>('');

  const onInputChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={`input ${className}`}>
      {icon && (
        <div className={'input__icon'}>
          <label form={id}>{icon}</label>
        </div>
      )}
      <input
        id={id}
        value={value}
        onChange={e => onInputChange(e)}
        placeholder={placeholderType === 'default' && placeholderText}
        className={`input__form ${icon ? 'input__form--with-icon' : ''}`}
        type={'text'}
      />
      {placeholderType === 'subscript' && <caption className={'input__caption'}>{placeholderText}</caption>}
    </div>
  );
};
