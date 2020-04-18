import React, { useState, ReactNode, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import classNames from 'classnames';
import { Sidebar } from 'components/Sidebar';
import './Header.scss';

export type IconType = 'back' | 'menu';

export interface IHeaderProps {
  children: ReactNode;
  iconType: IconType;
  onIconClick: (iconType: IconType) => void;
  className?: string;
}

export const Header = ({ children, iconType, onIconClick, className }: IHeaderProps) => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
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
    if (iconType === 'menu') {
      setIsSidebarShown(true);
    }
    onIconClick(iconType);
  };

  const onSidebarClose = () => {
    setIsSidebarShown(false);
  };

  return (
    <Fragment>
      <Container>
        <header className="rsh-header">
          <div onClick={onClick} className={headerIconClassNames} />
          <div className={headerContentClassNames}>{children}</div>
        </header>
      </Container>
      {iconType === 'menu' && <Sidebar visible={isSidebarShown} onClose={onSidebarClose} />}
    </Fragment>
  );
};
