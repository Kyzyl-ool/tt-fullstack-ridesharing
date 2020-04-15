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
  withRedirectTo?: boolean;
  confirmButtonDisabled?: boolean;
}

export const Dialog: React.FC<IDialog> = ({
  children,
  onClose,
  buttonText,
  hide = false,
  cross = true,
  confirmButtonDisabled = false
}) => {
  return (
    <>
      {hide ? null : (
        <div className={'dialog'}>
          {children}

          <Button className="dialog__button" filled onClick={onClose} disabled={confirmButtonDisabled}>
            {buttonText ? buttonText : 'OK'}
          </Button>

          {cross ? <div className={'dialog__close-button'} onClick={onClose} /> : null}
        </div>
      )}
    </>
  );
};
