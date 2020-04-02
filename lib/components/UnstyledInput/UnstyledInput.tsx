import React, { useState } from 'react';
import './UnstyledInput.scss';

interface IUnstyledInput {
  name: string;
  value: string;
  className: string;
  placeholder?: string;
}

export const UnstyledInput: React.FC<IUnstyledInput> = ({ name, value: iValue, className, placeholder }) => {
  const [value, setValue] = useState<string>(iValue);

  return (
    <input
      type={'text'}
      value={value}
      name={name}
      onChange={e => setValue(e.target.value)}
      className={`unstyled-input ${className ? className : null}`}
      placeholder={placeholder}
    />
  );
};
