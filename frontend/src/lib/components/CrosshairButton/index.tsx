import React, { FunctionComponent, ReactNode } from 'react';
import { Button } from '@material-ui/core';
import './CrosshairButton.scss';

interface ICrosshairButtonProps {
  children?: ReactNode;
  onClick: () => void;
}

const CrosshairButton: FunctionComponent<ICrosshairButtonProps> = ({ children, onClick }) => {
  return (
    <div className="crosshair-button__crosshair" onClick={onClick}>
      {children}
    </div>
  );
};

export default CrosshairButton;
