import React, { useState } from 'react';
import penSrc from '../../icons/Pen.svg';
import trashSrc from '../../icons/Trash.svg';
import okSrc from '../../icons/Ok.svg';
import { UnstyledInput } from '../UnstyledInput/UnstyledInput';
import { ICar } from 'domain/car';
import './CarCard.scss';

export type CarDataType = {
  id: number;
  text: string;
  name: string;
  number: string;
  color: string;
};

interface ICarCard {
  car: ICar;
  onDelete: (any) => any;
  onChange: (any, NewDataType) => any;
}

export const CarCard: React.FC<ICarCard> = ({ car: { name, number, color, text, id }, onDelete, onChange }) => {
  const [editing, setEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setEditing(true);
  };
  const handleSubmit: (any) => any = e => {
    e.preventDefault();
    setEditing(false);
    onChange(id, {
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
