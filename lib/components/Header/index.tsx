import React, { ReactNode, ReactElement } from 'react';
import { Container } from 'semantic-ui-react';
import classNames from 'classnames';
import './Header.scss';

export type IconType = 'back' | 'menu';

export interface IHeaderProps {
  children: ReactNode;
  iconType: IconType;
  onIconClick: (iconType: IconType) => void;
  className?: string;
}

export const Header = ({ children, iconType, onIconClick, className }: IHeaderProps) => {
  const headerIconClassNames = classNames({
    'rsh-header__icon': true,
    [iconType === 'back' ? 'rsh-header__icon--back-arrow' : 'rsh-header__icon--menu']: true,
    [className]: className
  });

  // Only two types of content available for header (at current moment): text and ReactElement
  const headerContentClassNames = classNames({
    [typeof children === 'string' ? 'rsh-header__text' : 'rsh-header__label']: true
  });

  const onClick = () => {
    onIconClick(iconType);
  };

  return (
    <Container>
      <header className="rsh-header">
        <div onClick={onClick} className={headerIconClassNames} />
        <div className={headerContentClassNames}>{children}</div>
      </header>
    </Container>
  );
};
