import React, { useState, ReactNode, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import classNames from 'classnames';
import { Sidebar } from 'components/Sidebar';
import './Header.scss';

export type IconType = 'back' | 'menu';

export interface IHeaderProps {
  children: ReactNode;
  iconType?: IconType;
  onIconClick?: (iconType: IconType) => void;
  className?: string;
  containerClassName?: string;
  withoutIcon?: boolean;
}

export const Header = ({
  children,
  iconType = 'menu',
  onIconClick = () => {},
  className,
  containerClassName = '',
  withoutIcon = false
}: IHeaderProps) => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const headerIconClassNames = classNames({
    'rsh-header__icon': true,
    [iconType === 'back' ? 'rsh-header__icon--back-arrow' : 'rsh-header__icon--menu']: true,
    [className]: className
  });

  const headerClassNames = classNames('rsh-header', { [containerClassName]: true });

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
        <header className={headerClassNames}>
          {!withoutIcon && <div onClick={onClick} className={headerIconClassNames} />}
          <div className={headerContentClassNames}>{children}</div>
        </header>
      </Container>
      <Sidebar visible={isSidebarShown} onClose={onSidebarClose} />
    </Fragment>
  );
};
