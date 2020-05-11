import React, { useState, ReactNode, useEffect } from 'react';
import * as validators from './validators';
import { IValidator } from './validators/types';
import './Input.scss';

type InputPlaceholderType = 'default' | 'subscript';

interface IInput {
  defaultValue?: string;
  className?: string;
  adornmentClassName?: string;
  placeholderType?: InputPlaceholderType;
  icon?: React.ReactElement;
  id: string;
  placeholderText: string;
  onChange?: (value: string, isValid?: boolean) => void;
  validate?: IValidator;
  changeModifier?: (value: string) => string;
  renderRightAdornment?: () => ReactNode;
  disabled?: boolean;
  type?: string;
  errored?: boolean;
}

const Input = ({
  placeholderType = 'default',
  defaultValue = '',
  className = '',
  adornmentClassName = '',
  icon,
  id,
  placeholderText,
  onChange = () => {},
  validate = null,
  changeModifier = null,
  renderRightAdornment = null,
  disabled = false,
  type = 'text'
}: IInput) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [error, setError] = useState('');

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onInputChange = e => {
    console.log(e.target.value);
    if (changeModifier) {
      const modifiedValue = changeModifier(e.target.value);
      setValue(modifiedValue);
      onChange(modifiedValue, validate && !validate(e.target.value));
    } else {
      setValue(e.target.value);
      onChange(e.target.value, validate && !validate(e.target.value));
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validate) {
      const errorMessage = validate(e.target.value);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError('');
      }
    }
  };

  return (
    <div className={`rsh-input ${className}`}>
      <div className={`rsh-input__content`}>
        {icon && (
          <div className="rsh-input__icon">
            <label form={id}>{icon}</label>
          </div>
        )}
        <input
          id={id}
          value={value}
          onChange={e => onInputChange(e)}
          onBlur={onBlur}
          placeholder={placeholderType === 'default' ? placeholderText : ''}
          className={`rsh-input__form ${icon ? 'rsh-input__form--with-icon' : ''} ${
            disabled ? 'rsh-input__form--disabled' : ''
          } ${error ? 'rsh-input__form--errored' : ''}`}
          type={type}
        />
        {renderRightAdornment && (
          <div className={`rsh-input__adornment ${adornmentClassName}`}>{renderRightAdornment()}</div>
        )}
        {placeholderType === 'subscript' && <div className="rsh-input__caption">{placeholderText}</div>}
      </div>
      <p className="rsh-input__error-text">{error}</p>
    </div>
  );
};

export { Input, validators };
