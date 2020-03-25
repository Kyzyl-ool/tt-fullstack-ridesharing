import React from 'react';
import './Icons.scss';

type IconSize = 'small' | 'medium';

interface IAbstractIcon {
  size?: IconSize;
}

type AbstractIcon = React.FC<IAbstractIcon>;

export const SearchIcon: AbstractIcon = ({ size = 'medium' }) => {
  return <div className={`icon icon_search icon_${size}`} />;
};

export const DotIcon: AbstractIcon = ({ size = 'medium' }) => {
  return <div className={`icon icon_dot icon_${size}`} />;
};

export const MapPointIcon: AbstractIcon = ({ size = 'medium' }) => {
  return <div className={`icon icon_map-point icon_${size}`} />;
};
