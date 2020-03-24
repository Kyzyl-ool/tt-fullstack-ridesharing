import React from 'react';
import { Button } from '../Button';
import './Dialog.scss';

interface IDialog {
  buttonText?: string;
  onClose: () => any;
  hide: boolean;
  cross?: boolean;
}

export const Dialog: React.FC<IDialog> = ({ children, onClose, buttonText, hide = false, cross = true }) => {
  return (
    <>
      {hide ? null : (
        <div className={'dialog'}>
          {children}
          <Button filled onClick={onClose}>
            {buttonText ? buttonText : 'OK'}
          </Button>
          {cross ? <div className={'dialog__close-button'} onClick={onClose} /> : null}
        </div>
      )}
    </>
  );
};
