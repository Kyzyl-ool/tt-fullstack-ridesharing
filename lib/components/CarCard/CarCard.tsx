import React, { useState } from 'react';
import './CarCard.scss';
import penSrc from '../../icons/Pen.svg';
import trashSrc from '../../icons/Trash.svg';
import okSrc from '../../icons/Ok.svg';
import { UnstyledInput } from '../UnstyledInput/UnstyledInput';

export type CarDataType = {
  id: number;
  text: string;
  name: string;
  number: string;
  color: string;
};

interface ICarCard {
  name: string;
  number: string;
  color: string;
  text: string;
  id: any;
  onDelete: (any) => any;
  onNewChanges: (any, NewDataType) => any;
}

export const CarCard: React.FC<ICarCard> = ({ name, number, color, text, id, onDelete, onNewChanges, ...rest }) => {
  const [editing, setEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setEditing(true);
  };
  const handleSubmit: (any) => any = e => {
    e.preventDefault();
    setEditing(false);
    onNewChanges(id, {
      name: e.target.name.value,
      number: e.target.number.value,
      color: e.target.color.value
    });
  };

  return (
    <li className={`car-card`}>
      <form style={{ textAlign: 'center', display: editing ? '' : 'none' }} onSubmit={handleSubmit} id={'car-form'}>
        <UnstyledInput value={name} className={'car-card__name'} name={'name'} />
        <UnstyledInput value={number} className={'car-card__number'} name={'number'} />
        <UnstyledInput value={color} className={'car-card__color'} name={'color'} />
      </form>
      <div style={{ textAlign: 'center', display: editing ? 'none' : '' }}>
        <p className={'car-card__name'}>{name}</p>
        <p className={'car-card__number'}>{number}</p>
        <p className={'car-card__color'}>{color}</p>
      </div>
      {!editing ? <p className={'car-card__text'}>{text}</p> : null}
      <ul>
        <li className={'car-card__icon'}>
          {editing ? (
            <>
              <label htmlFor={'car-form-submit'}>
                <img src={`${okSrc}`} />
              </label>
              <input type={'submit'} form={'car-form'} id={'car-form-submit'} hidden={true} />
            </>
          ) : (
            <img src={`${penSrc}`} onClick={handleEdit} />
          )}
        </li>
        <li className={'car-card__icon'} onClick={() => onDelete(id)}>
          <img src={trashSrc} />
        </li>
      </ul>
    </li>
  );
};
