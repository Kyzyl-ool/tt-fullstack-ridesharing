import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './Button.scss';

interface IButtonProps {
  children: ReactNode;
  className?: string;
  filled?: boolean;
  disabled?: boolean;
  onClick: () => unknown;
}

export const Button = ({ children, filled = false, onClick, className = '', disabled = false }: IButtonProps) => {
  const buttonClasses = classNames({
    'rsh-button': true,
    'rsh-button__disabled': disabled,
    'rsh-button__filled': filled,
    [className]: true
  });

  return (
    <button onClick={onClick} type="button" className={buttonClasses}>
      {children}
    </button>
  );
};
