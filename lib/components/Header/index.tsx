import React, { ReactNode } from 'react';
import { Container } from 'semantic-ui-react';
import classNames from 'classnames';
import './Header.scss';

type IconType = 'back' | 'menu';

interface IHeaderProps {
  children: ReactNode;
  iconType: IconType;
  onIconClick: () => void;
  className?: string;
}

export const Header = ({ children, iconType, onIconClick }: IHeaderProps) => {
  const headerIconClassNames = classNames({
    'rsh-header__icon': true,
    [iconType === 'back' ? 'rsh-header__icon--back-arrow' : 'rsh-header__icon--menu']: true
  });

  return (
    <Container>
      <header className="rsh-header">
        <div onClick={onIconClick} className={headerIconClassNames} />
        {children}
      </header>
    </Container>
  );
};
