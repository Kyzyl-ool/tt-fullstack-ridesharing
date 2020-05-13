import React from 'react';
import './ColorTile.scss';

export const colors = new Map([
  ['Красный', '#fa0107'],
  ['Синий', '#0693e3'],
  ['Зеленый', '#4caf50'],
  ['Желтый', '#fccb00'],
  ['Серебристый', '#d9d9d9'],
  ['Белый', '#ffffff'],
  ['Черный', '#242424']
]);

export const colorDict = ['Красный', 'Синий', 'Зеленый', 'Желтый', 'Серебристый', 'Белый', 'Черный'];

export const ColorTile = ({ color }) => {
  return (
    <div
      className="color-tile"
      style={{
        backgroundColor: colors.get(color)
      }}
    />
  );
};
