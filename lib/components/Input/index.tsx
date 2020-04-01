import React, { useState, ReactNode, useEffect } from 'react';
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
  renderRightAdornment?: () => ReactNode;
  disabled?: boolean;
}

export const Input = ({
  placeholderType = 'default',
  defaultValue = '',
  className = '',
  icon,
  id,
  placeholderText,
  onChange = () => {},
  validate = () => {},
  renderRightAdornment = null,
  disabled = false
}: IInput) => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onInputChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
    validate(e.target.value);
  };

  return (
    <div className={`rsh-input ${className}`}>
      {icon && (
        <div className="rsh-input__icon">
          <label form={id}>{icon}</label>
        </div>
      )}
      <input
        id={id}
        value={value}
        onChange={e => onInputChange(e)}
        placeholder={placeholderType === 'default' ? placeholderText : ''}
        className={`rsh-input__form ${icon ? 'rsh-input__form--with-icon' : ''} ${
          disabled ? 'rsh-input__form--disabled' : ''
        }`}
        type="text"
      />
      {renderRightAdornment && <div className="rsh-input__adornment">{renderRightAdornment()}</div>}
      {placeholderType === 'subscript' && <div className="rsh-input__caption">{placeholderText}</div>}
    </div>
  );
};
