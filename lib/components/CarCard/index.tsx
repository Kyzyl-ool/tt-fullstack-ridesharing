import React, { useState } from 'react';
import _isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import penSrc from '../../icons/Pen.svg';
import trashSrc from '../../icons/Trash.svg';
import okSrc from '../../icons/Ok.svg';
import { UnstyledInput } from '../UnstyledInput/UnstyledInput';
import { ICar } from 'domain/car';
import './CarCard.scss';

interface ICarCard {
  isCardSelected: boolean;
  car?: ICar;
  onDelete: (any) => any;
  onChange: (any, NewDataType) => any;
  onClick: (carId: string) => void;
}

const emptyCar: ICar = {
  model: '',
  registryNumber: '',
  color: '',
  owner: null,
  id: null
};

export const CarCard: React.FC<ICarCard> = ({
  isCardSelected,
  car = emptyCar,
  car: { model, registryNumber, color, id } = emptyCar,
  onDelete,
  onChange,
  onClick
}) => {
  const carCardClassNames = classNames({
    'car-card': true,
    'car-card--selected': isCardSelected
  });

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

  const onCardClick = () => {
    onClick(id);
  };

  return _isEqual(car, emptyCar) ? (
    <li className={carCardClassNames} onClick={onCardClick}>
      <form style={{ textAlign: 'center', display: editing ? '' : 'none' }} onSubmit={handleSubmit} id={'car-form'}>
        <UnstyledInput value={model} className={'car-card__name'} name={'name'} />
        <UnstyledInput value={registryNumber} className={'car-card__number'} name={'number'} />
        <UnstyledInput value={color} className={'car-card__color'} name={'color'} />
      </form>
      <div style={{ textAlign: 'center', display: editing ? 'none' : '' }}>
        <p className={'car-card__name'}>{model}</p>
        <p className={'car-card__number'}>{registryNumber}</p>
        <p className={'car-card__color'}>{color}</p>
      </div>
      {!editing ? <p className={'car-card__text'}>Пользователи пока не оценивали этот автомобиль</p> : null}
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
  ) : (
    <div>no car</div>
  );
};
