import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import './Button.scss';

interface IButtonProps {
  children: ReactNode;
  className: string;
  filled: boolean;
  disabled: boolean;
  onClick: () => unknown;
}

export const Button: FunctionComponent<IButtonProps> = ({ children, filled, onClick, className, disabled }) => {
  const buttonClasses = classNames({
    'shr-button': true,
    disabled,
    filled
  });

  return (
    <button onClick={onClick} type="button" className={buttonClasses}>
      {children}
    </button>
  );
};
