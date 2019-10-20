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
  id: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onSelect: (option: ISelectedOption) => void;
}

export default class DropdownInput extends PureComponent<IDropdownInputProps, {}> {
  public onSelectOption = (e: React.MouseEvent<HTMLLIElement>) => {
    const { id, onSelect } = this.props;
    onSelect({ id, value: e.currentTarget.innerText });
  };

  render() {
    const { suggestions, onChange, placeholder, value, label, id } = this.props;
    return (
      <div className="dropdown-input__container">
        <TextField
          id={id}
          label={label}
          value={value}
          style={{ margin: 8 }}
          placeholder={placeholder}
          margin="normal"
          onChange={onChange}
          InputLabelProps={{
            shrink: true
          }}
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
