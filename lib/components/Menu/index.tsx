import React, { ReactNode, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';
import UserModel from 'models/UserModel';

// type RouteIconType = "PROFILE" | "STAR" |

interface IRoute {
  path: string;
  label: string;
  routeIconClassModifier: string;
  disabled: boolean;
  backendRequestCallback?: () => void;
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
    disabled: true
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
    path: '/auth',
    label: 'Выход',
    routeIconClassModifier: 'logout',
    disabled: false,
    backendRequestCallback: async () => {
      await UserModel.logout();
    }
  }
];

export const Menu = () => {
  return (
    <ul className="rsh-menu">
      {APPLICATION_ROUTES.map(({ path, label, routeIconClassModifier, disabled, backendRequestCallback }) => {
        return (
          <li key={path} className="rsh-menu__item">
            <div
              onClick={backendRequestCallback}
              className={`rsh-menu__item-content ${disabled ? 'rsh-menu__item-content--disabled' : ''}`}
            >
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
