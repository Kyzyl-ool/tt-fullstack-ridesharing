import React from 'react';
import './Auth.scss';

interface ILandingHeaderTab {
  scrollToId: string;
  tabName: string;
}

export const LandingHeaderTab: React.FC<ILandingHeaderTab> = ({ scrollToId, tabName }) => {
  const handleClick = () => {
    document.getElementById(scrollToId).scrollIntoView({ behavior: 'smooth' });
  };
  return <nav onClick={handleClick}>{tabName}</nav>;
};
