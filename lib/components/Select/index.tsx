import React from 'react';
import classNames from 'classnames';
import _isEmpty from 'lodash/isEmpty';
import { IInputProps, Input } from '../Input';
import { LocationItem } from 'components/LocationsList/LocationItem';
import { ILocation } from 'domain/map';
import './Select.scss';

type IOption = {
  id: string;
  name: string;
};

interface ISelectProps extends IInputProps {
  selectionOptions: IOption[];
  onSelect: (optionId: string) => void;
  renderOption?: (option: IOption, onSelectOption: (option: IOption) => void) => React.ReactNode;
  maxOptions?: number;
}

export const Select = ({
  selectionOptions,
  onSelect,
  className,
  renderOption = null,
  maxOptions = 3,
  ...inputProps
}: ISelectProps) => {
  const selectClassNames = classNames({
    'rsh-select': true,
    [className]: true
  });
  const onSelectOption = (location: ILocation) => {
    return onSelect(location.address || location.id);
  };
  return (
    <div className={selectClassNames}>
      <Input {...(inputProps as IInputProps)} />
      {!_isEmpty(selectionOptions) && (
        <ul className="rsh-select__options">
          {selectionOptions.map((option, index) => (
            <>
              {index < maxOptions && (
                <>
                  {renderOption ? (
                    renderOption(option, onSelectOption)
                  ) : (
                    <LocationItem key={option.id} onSelectLocation={onSelectOption} location={option} />
                  )}
                </>
              )}
            </>
          ))}
        </ul>
      )}
    </div>
  );
};
