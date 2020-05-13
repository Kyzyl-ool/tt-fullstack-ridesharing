import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import './Dialog.scss';

interface IDialog {
  redirectTo?: string;
  buttonText?: string;
  onDone?: () => any;
  onClose: () => any;
  hide: boolean;
  cross?: boolean;
  withRedirectTo?: boolean;
  withConfirmButton?: boolean;
  confirmButtonDisabled?: boolean;
  className?: string;
}

export const Dialog: React.FC<IDialog> = ({
  children,
  onClose,
  onDone = null,
  buttonText,
  hide = false,
  cross = true,
  confirmButtonDisabled = false,
  withConfirmButton = true,
  className = ''
}) => {
  return (
    <>
      {hide ? null : (
        <div className={`dialog ${className ? className : ''}`}>
          {children}

          {withConfirmButton && (
            <Button
              className="dialog__button"
              filled
              onClick={onDone ? onDone : onClose}
              disabled={confirmButtonDisabled}
            >
              {buttonText ? buttonText : 'OK'}
            </Button>
          )}

          {cross ? <div className={'dialog__close-button'} onClick={onClose} /> : null}
        </div>
      )}
    </>
  );
};
