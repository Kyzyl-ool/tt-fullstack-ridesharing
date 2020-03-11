import React from 'react';
import './Avatar.scss';
import { Mark, markToText } from '../Mark/Mark';

type AvatarSize = 'small' | 'medium' | 'large';

interface IAvatar {
  src: string;
  mark?: number;
  size: AvatarSize;
}

export const Avatar: React.FC<IAvatar> = ({ src, mark, size }) => {
  const img = (
    <img
      src={src}
      alt={'Avatar'}
      className={`avatar avatar_${size} ${mark ? `avatar_stroke avatar_stroke-${markToText(mark)}` : ''}`}
    />
  );
  if (mark)
    return (
      <span className={'avatar-container'}>
        {img}
        <Mark mark={mark} large={size === 'large'} />
      </span>
    );
  else return img;
};
