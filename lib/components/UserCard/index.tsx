import React from 'react';
import './UserCard.scss';
import { Avatar } from '../Avatar/Avatar';

interface IUserCard {
  avatarSrc: string;
  mark: number;
  name: string;
}

export const UserCard: React.FC<IUserCard> = ({ avatarSrc, mark, name, ...rest }) => {
  return (
    <div className={'user-card'} {...rest}>
      <Avatar src={avatarSrc} size={'medium'} mark={mark} />
      <span className={'user-card__name'}>{name}</span>
    </div>
  );
};
