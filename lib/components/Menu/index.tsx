import React, { ReactNode, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

// type RouteIconType = "PROFILE" | "STAR" |

interface IRoute {
  path: string;
  label: string;
  routeIconClassModifier: string;
  disabled: boolean;
}

const APPLICATION_ROUTES: IRoute[] = [
  {
    path: '/profile',
    label: 'Мой профиль',
    routeIconClassModifier: 'profile',
    disabled: false
  },
  {
    path: '/rating',
    label: 'Мой рейтинг',
    routeIconClassModifier: 'rating',
    disabled: false
  },
  {
    path: '/rides',
    label: 'Активные поездки',
    routeIconClassModifier: 'active-rides',
    disabled: true
  },
  {
    path: '/ride/history',
    label: 'История поездок',
    routeIconClassModifier: 'history',
    disabled: true
  },
  {
    path: '/help',
    label: 'Помощь',
    routeIconClassModifier: 'help',
    disabled: true
  },
  {
    path: '/logout',
    label: 'Выход',
    routeIconClassModifier: 'logout',
    disabled: true
  }
];

export const Menu = () => {
  return (
    <ul className="rsh-menu">
      {APPLICATION_ROUTES.map(({ path, label, routeIconClassModifier, disabled }) => {
        return (
          <li key={path} className="rsh-menu__item">
            <div className={`rsh-menu__item-content ${disabled ? 'rsh-menu__item-content--disabled' : ''}`}>
              <div className={`rsh-menu__icon rsh-menu__icon--${routeIconClassModifier}`} />
              <Link to={path}>
                <h4 className="rsh-menu__label">{label}</h4>
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
