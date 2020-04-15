import React, { ReactNode, Fragment } from 'react';
import { Link } from 'react-router-dom';
import UserModel from 'models/UserModel';
import './Menu.scss';
import { useSelector } from 'react-redux';
import { useAuth } from 'hooks/useAuth';

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
    path: '/user',
    label: 'Мой рейтинг',
    routeIconClassModifier: 'rating',
    disabled: false
  },
  {
    path: '/ride/active',
    label: 'Активные поездки',
    routeIconClassModifier: 'active-rides',
    disabled: false
  },
  {
    path: '/ride/history',
    label: 'История поездок',
    routeIconClassModifier: 'history',
    disabled: false
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
  const { id: userId } = useSelector(state => state.user.user);
  const [auth, , logout] = useAuth();

  const userSpecifiedPath = `/user/${userId}`;
  return (
    <ul className="rsh-menu">
      {APPLICATION_ROUTES.map(({ path, label, routeIconClassModifier, disabled, backendRequestCallback }) => {
        return (
          <li key={path} className="rsh-menu__item">
            <div
              onClick={async () => {
                // backendRequestCallback();
                await logout();
              }}
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
