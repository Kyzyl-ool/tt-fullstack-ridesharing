import React from 'react';
import './BaseLayer.scss';

type BaseLayerType = 'primary' | 'secondary';

interface IBaseLayer {
  type: BaseLayerType;
  header: string;
}

export const BaseLayer: React.FC<IBaseLayer> = ({ header, type = 'primary', children }) => {
  return (
    <div className={`base-layer base-layer_${type}`}>
      <p className={'base-layer__header'}>{header}</p>
      {children}
    </div>
  );
};
