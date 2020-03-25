import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import './Dialog.scss';

interface IDialog {
  redirectTo?: string;
  buttonText?: string;
  onClose: () => any;
  hide: boolean;
  cross?: boolean;
}

export const Dialog: React.FC<IDialog> = ({
  children,
  onClose,
  buttonText,
  hide = false,
  cross = true,
  redirectTo = '/'
}) => {
  return (
    <>
      {hide ? null : (
        <div className={'dialog'}>
          {children}
          <Link to={redirectTo}>
            <Button className="dialog__button" filled onClick={onClose}>
              {buttonText ? buttonText : 'OK'}
            </Button>
          </Link>
          {cross ? <div className={'dialog__close-button'} onClick={onClose} /> : null}
        </div>
      )}
    </>
  );
};
