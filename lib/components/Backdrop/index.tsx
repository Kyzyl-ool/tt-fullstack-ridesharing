import React, { ReactNode } from 'react';
import './Backdrop.scss';

interface IBackdropProps {
  children: ReactNode;
}

export const Backdrop = ({ children }: IBackdropProps) => {
  return <div className="rsh-backdrop">{children}</div>;
};
