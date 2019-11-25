import React from 'react';
import classNames from 'classnames';
import './RoleButton.scss';

interface IRoleButtonProps {
  role: 'driver' | 'passenger';
  className: string;
  disable?: boolean;
  onClick: () => void;
  label: string;
  comment?: string;
}

const RoleButton: React.FC<IRoleButtonProps> = ({ role, className, onClick, disable = false, label, comment }) => {
  const buttonClasses = classNames({
    className,
    'role-button__button--disable': disable,
    'role-button__button': true,
    'role-button__button--driver': role === 'driver',
    'role-button__button--passenger': role === 'passenger'
  });

  const iconClasses = classNames({
    'role-button__icon': true,
    'role-button__icon--driver': role === 'driver',
    'role-button__icon--passenger': role === 'passenger'
  });

  return (
    <button onClick={disable ? () => {} : onClick} className={buttonClasses} type="button">
      <div className="role-button__container">
        <div className={iconClasses}></div>
        <div className="role-button__role">{label}</div>
        <p className="role-button__comment">{comment}</p>
      </div>
    </button>
  );
};

export default RoleButton;
