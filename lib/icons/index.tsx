import React from 'react';
import './Icons.scss';

type IconSize = 'small' | 'medium';

interface IAbstractIcon {
  size?: IconSize;
  className?: string;
}

type AbstractIcon = React.FC<IAbstractIcon>;

export const SearchIcon: AbstractIcon = ({ size = 'medium', className }) => {
  return <div className={`icon icon_search icon_${size} ${className ? className : ''}`} />;
};

export const DotIcon: AbstractIcon = ({ size = 'medium', className }) => {
  return <div className={`icon icon_dot icon_${size} ${className ? className : ''}`} />;
};

export const MapPointIcon: AbstractIcon = ({ size = 'medium', className }) => {
  return <div className={`icon icon_map-point icon_${size} ${className ? className : ''}`} />;
};

export const BackButton: AbstractIcon = ({ size = 'medium', className }) => {
  return <div className={`icon icon_back-white icon_${size} ${className ? className : ''}`} />;
};

export const PenIcon: AbstractIcon = ({ size = 'medium', className }) => {
  return <div className={`icon icon_pen-icon icon_${size} ${className ? className : ''}`} />;
};

export const PlusIcon: AbstractIcon = ({ size = 'medium', className }) => {
  return <div className={`icon icon_plus-icon icon_${size} ${className ? className : ''}`} />;
};
