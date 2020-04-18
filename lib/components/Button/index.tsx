import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './Button.scss';

interface IButtonProps {
  children: ReactNode;
  className?: string;
  filled?: boolean;
  disabled?: boolean;
  onClick: () => unknown;
  shadowed?: boolean;
  outlined?: boolean;
}

export const Button = ({
  children,
  filled = false,
  onClick,
  className = '',
  disabled = false,
  shadowed = false,
  outlined = false
}: IButtonProps) => {
  const buttonClasses = classNames({
    'rsh-button': true,
    'rsh-button__disabled': disabled,
    'rsh-button__filled': filled,
    [className]: true,
    'rsh-button__shadowed': shadowed,
    'rsh-button__outlined': outlined
  });

  return (
    <button disabled={disabled} onClick={onClick} type="button" className={buttonClasses}>
      {children}
    </button>
  );
};
