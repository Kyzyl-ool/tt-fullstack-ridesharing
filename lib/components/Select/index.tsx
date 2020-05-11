import React from 'react';
import classNames from 'classnames';
import _isEmpty from 'lodash/isEmpty';
import { IInputProps, Input } from '../Input';
import { LocationItem } from 'components/LocationsList/LocationItem';
import './Select.scss';

type IOption = {
  id: string;
  name: string;
};

interface ISelectProps extends IInputProps {
  selectionOptions: IOption;
  onSelect: (optionId: string) => void;
  maxOptions?: number;
}

export const Select = ({ selectionOptions, onSelect, className, maxOptions = 3, ...inputProps }: ISelectProps) => {
  const selectClassNames = classNames({
    'rsh-select': true,
    [className]: true
  });
  return (
    <div className={selectClassNames}>
      <Input {...(inputProps as IInputProps)} />
      {!_isEmpty(selectionOptions) && (
        <ul className="rsh-select__options">
          {selectionOptions.map((option, index) => (
            <>
              {index < maxOptions && (
                <LocationItem
                  key={option.id}
                  onSelectLocation={location => onSelect(location.address)}
                  location={option}
                />
              )}
            </>
          ))}
        </ul>
      )}
    </div>
  );
};
