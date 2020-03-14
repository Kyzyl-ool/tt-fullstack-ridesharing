import React from 'react';
import { Button } from '../Button';
import './Dialog.scss';

interface IDialog {
  buttonText?: string;
  onClose: () => any;
  hide: boolean;
}

export const Dialog: React.FC<IDialog> = ({ children, onClose, buttonText, hide = false }) => {
  return (
    <>
      {hide ? null : (
        <div className={'dialog'}>
          {children}
          <Button filled onClick={onClose}>
            {buttonText ? buttonText : 'OK'}
          </Button>
          <div className={'dialog__close-button'} onClick={onClose} />
        </div>
      )}
    </>
  );
};
