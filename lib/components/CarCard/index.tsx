import React, { useState } from 'react';
import classNames from 'classnames';
import penSrc from '../../icons/Pen.svg';
import trashSrc from '../../icons/Trash.svg';
import okSrc from '../../icons/Ok.svg';
import { UnstyledInput } from '../UnstyledInput/UnstyledInput';
import { ICar } from 'domain/car';
import './CarCard.scss';
import { ColorTile } from 'pages/blocks/CarSelectBlock/blocks/CreateCarDialog/components/ColorTile';

export type CarDataType = {
  id: string;
  text: string;
  name: string;
  number: string;
  color: string;
};

interface ICarCard {
  isCardSelected: boolean;
  car: ICar;
  onDelete: (any) => any;
  onChange: (any, NewDataType) => any;
  onClick: (carId: string) => void;
  editing?: boolean;
  withClickableCars?: boolean;
}

export const CarCard: React.FC<ICarCard> = ({
  isCardSelected,
  car: { model, registryNumber, color, text, id },
  onDelete,
  onChange,
  onClick,
  editing: iediting = false,
  withClickableCars = true
}) => {
  const carCardClassNames = classNames({
    'car-card': true,
    'car-card--selected': isCardSelected
  });

  const [editing, setEditing] = useState<boolean>(iediting);

  // const handleEdit = () => {
  //   setEditing(true);
  // };
  const handleSubmit = e => {
    e.preventDefault();
    setEditing(false);
    onChange(id, {
      name: e.target.name.value,
      number: e.target.number.value,
      color: e.target.color.value
    });
  };

  const onCardClick = () => {
    withClickableCars && onClick(id);
  };

  return (
    <li className={carCardClassNames} onClick={onCardClick}>
      <form
        style={{ textAlign: 'center', display: editing ? '' : 'none' }}
        onSubmit={handleSubmit}
        id={`car-form${id}`}
      >
        <UnstyledInput value={model} className={'car-card__name'} name={'name'} placeholder={'Введите имя'} />
        <UnstyledInput
          value={registryNumber}
          className={'car-card__number'}
          name={'number'}
          placeholder={'Введите номер'}
        />
        <UnstyledInput value={color} className={'car-card__color'} name={'color'} placeholder={'Введите цвет'} />
      </form>
      <div className="car-card__info" style={{ textAlign: 'center', display: editing ? 'none' : '' }}>
        <p className={'car-card__name'}>{model}</p>
        <div className={'car-card__number-container'}>
          <p className={'car-card__number'}>{registryNumber}</p>
          <div className={'car-card__color'}>
            {/* <p>{color}</p> */}
            <ColorTile color={color} />
          </div>
        </div>
      </div>
      {/* {!editing ? <p className={'car-card__text'}>Пользователи пока не оценивали этот автомобиль</p> : null} */}
      <ul className="car-card__icons">
        {/* <li className={'car-card__icon'}>
          {editing ? (
            <>
              <label htmlFor={'car-form-submit'}>
                <img src={`${okSrc}`} />
              </label>
              <input type={'submit'} form={`car-form${id}`} id={'car-form-submit'} hidden={true} />
            </>
          ) : (
            <img src={`${penSrc}`} onClick={handleEdit} />
          )}
        </li> */}
        <li className={'car-card__icon'} onClick={() => onDelete(id)}>
          <img src={trashSrc} />
        </li>
      </ul>
    </li>
  );
};
