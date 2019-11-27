import React, { PureComponent } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { TextField } from '@material-ui/core';
import './DropdownInput.scss';

interface ISelectedOption {
  id: string;
  value: string;
}

interface IDropdownInputProps {
  suggestions?: string[];
  variant?: any;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  label?: string;
  margin?: number;
  value: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onChange: any;
  onSelect: (option: ISelectedOption) => void;
}

export default class DropdownInput extends PureComponent<IDropdownInputProps, {}> {
  public onSelectOption = (e: React.MouseEvent<HTMLLIElement>) => {
    const { id, onSelect } = this.props;
    onSelect({ id, value: e.currentTarget.innerText });
  };

  // public onStartTyping = ()

  render() {
    const {
      suggestions,
      onChange,
      placeholder,
      value,
      label,
      id,
      variant = 'outlined',
      margin = 8,
      fullWidth = false
    } = this.props;
    return (
      <div className={fullWidth ? 'dropdown-input__fullwidth-container' : 'dropdown-input__container'}>
        <TextField
          id={id}
          label={label}
          value={value}
          style={{ margin }}
          placeholder={placeholder}
          margin="normal"
          onChange={onChange}
          variant={variant}
          fullWidth={fullWidth}
        />
        {suggestions && !_isEmpty(suggestions) && (
          <div className="dropdown-input__menu-container">
            <ul className="dropdown-input__menu">
              {suggestions.map((sugg, index) => (
                <li className="dropdown-input__menu-item" key={index} onClick={this.onSelectOption}>
                  {sugg}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
