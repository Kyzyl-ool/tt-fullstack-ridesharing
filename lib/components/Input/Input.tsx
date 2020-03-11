import React, { useState } from 'react';
import './Input.scss';

type InputPlaceholderType = 'default' | 'subscript';

interface IInput {
  placeholderType: InputPlaceholderType;
  icon?: React.ReactElement;
  id: string;
  form: string;
  placeholderText: string;
  className?: string;
}

export const Input: React.FC<IInput> = ({ placeholderType, icon, form, id, placeholderText, className }) => {
  const [value, setValue] = useState<string>('');

  return (
    <div className={`input ${className ? className : ''}`}>
      {icon && (
        <div className={'input__icon'}>
          <label form={form}>{icon}</label>
        </div>
      )}
      <input
        id={id}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholderType === 'default' ? placeholderText : ''}
        className={`input__form ${icon ? 'input__form_with-icon' : ''}`}
        type={'text'}
      />
      {placeholderType === 'subscript' && <span className={'input__caption'}>{placeholderText}</span>}
    </div>
  );
};
