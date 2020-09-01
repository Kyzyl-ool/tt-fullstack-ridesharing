import React from 'react';
import './ColorTile.scss';

// export const colors = new Map([
//   ['Красный', '#fa0107'],
//   ['Синий', '#0693e3'],
//   ['Зеленый', '#4caf50'],
//   ['Желтый', '#fccb00'],
//   ['Серебристый', '#d9d9d9'],
//   ['Белый', '#ffffff'],
//   ['Черный', '#242424']
// ]);

// export const colorDict = ['Красный', 'Синий', 'Зеленый', 'Желтый', 'Серебристый', 'Белый', 'Черный'];

interface IColorTile {
  color: string;
  long?: boolean;
}

const DEFAULT_TILE_COLOR = '#000000';

export const ColorTile: React.FC<IColorTile> = ({ color, long = true }) => {
  const validateColor = (c: string) => (c.startsWith('#') ? color : DEFAULT_TILE_COLOR);
  return (
    <div
      className={`color-tile ${long ? 'long-tile' : ''}`}
      style={{
        // backgroundColor: colors.get(color)
        backgroundColor: validateColor(color)
      }}
    />
  );
};
