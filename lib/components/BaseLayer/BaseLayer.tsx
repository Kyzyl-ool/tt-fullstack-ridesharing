import React from 'react';
import './BaseLayer.scss';

type BaseLayerType = 'primary' | 'secondary' | 'headed';

interface IBaseLayer {
  type: BaseLayerType;
  header: React.ReactNode;
}

export const BaseLayer: React.FC<IBaseLayer> = ({ header, type = 'primary', children }) => {
  return (
    <div className={`base-layer base-layer_${type}`}>
      <div className={`base-layer__header ${type === 'headed' ? 'base-layer__header_headed' : ''}`}>{header}</div>
      {children}
    </div>
  );
};
