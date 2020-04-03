import React from 'react';
import './Avatar.scss';
import { Mark, markToText } from '../Mark/Mark';

type AvatarSize = 'small' | 'medium' | 'large';

interface IAvatar {
  src: string;
  mark?: number;
  size: AvatarSize;
  subtext?: string;
  className?: string;
  shadowed?: boolean;
}

export const Avatar: React.FC<IAvatar> = ({ src, mark, className, size, subtext, shadowed = false }) => {
  const img = (
    <div className={`avatar-subtext-container`}>
      <img
        src={src}
        alt={'Avatar'}
        className={`avatar avatar_${size} ${mark ? `avatar_stroke avatar_stroke-${markToText(mark)}` : ''}`}
      />
      {subtext ? <div className={`avatar__subtext`}>{subtext}</div> : null}
    </div>
  );
  if (mark)
    return (
      <span className={`avatar-container ${className ? className : ''} ${shadowed ? 'avatar-container_shadowed' : ''}`}>
        {img}
        <Mark mark={mark} large={size === 'large'} />
      </span>
    );
  else return img;
};
