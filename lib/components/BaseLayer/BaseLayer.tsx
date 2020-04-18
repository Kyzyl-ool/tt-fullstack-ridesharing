import React from 'react';
import './BaseLayer.scss';

type BaseLayerType = 'primary' | 'secondary' | 'headed';

interface IBaseLayer {
  type: BaseLayerType;
  header?: React.ReactNode;
  className?: string;
}

export const BaseLayer: React.FC<IBaseLayer> = ({ header, className, type = 'primary', children }) => {
  return (
    <div className={`base-layer base-layer_${type} ${className ? className : ''}`}>
      {header ? (
        <div className={`base-layer__header ${type === 'headed' ? 'base-layer__header_headed' : ''}`}>{header}</div>
      ) : null}
      {children}
    </div>
  );
};
