import React from 'react';
import './Mark.scss';

interface IMark {
  mark: number;
  large: boolean;
}
/*
[8; 10] – зеленый
[5; 8) – желтый
[3; 5) – оранжевый
(0; 3) – красный
{0} – серый
 */
export function markToText(mark: number): string {
  if (mark === 0) return 'gray';
  if (mark > 0 && mark < 3) return 'red';
  if (mark >= 3 && mark < 5) return 'orange';
  if (mark >= 5 && mark < 8) return 'yellow';
  if (mark >= 8 && mark <= 10) return 'green';
  throw new Error('unknown error');
}

export const Mark: React.FC<IMark> = ({ mark, large }) => {
  return <span className={`mark mark_background-${markToText(mark)} ${large ? 'mark_large' : ''}`}>{mark}/10</span>;
};
