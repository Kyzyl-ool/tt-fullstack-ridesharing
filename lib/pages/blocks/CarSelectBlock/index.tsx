import React, { Fragment, useState } from 'react';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { CarCard } from 'components/CarCard';
import { Slider } from 'components/Slider';
import { Button } from 'components/Button';
import { GoBackArrow } from 'components/GoBackArrow';
import { ICar } from 'domain/car';
import './CarSelectBlock.scss';

type CarInfo = Omit<ICar, 'id'>;

interface ICarSelectBlock {
  visible: boolean;
  userCars: ICar[];
  onGoBack: () => void;
  onCarInfoChange: (carId: string, carInformation: CarInfo) => void;
  onCarSelect: (carId: string) => void;
  onDelete: (carId: string) => void;
  onClick?: (carId: string) => void;
}

export const CarSelectBlock = ({
  visible,
  userCars,
  onGoBack,
  onDelete,
  onCarInfoChange,
  onCarSelect,
  onClick
}: ICarSelectBlock) => {
  const [selectedCarId, setSelectedCarId] = useState('');

  const onCardClicked = (carId: string) => {
    console.log(carId);
    setSelectedCarId(carId);
    if (onClick) {
      onClick(carId);
    }
  };

  const onSelectButtonClick = () => {
    onCarSelect(selectedCarId);
  };

  return (
    <Fragment>
      {visible && <GoBackArrow onGoBack={onGoBack} className="car-select-block__back-arrow" />}
      <Slider visible={visible} timeout={600} from="bottom" unmountOnExit>
        <BaseLayer type="secondary" header="Выберите автомобиль" className="car-select-block__layer">
          <div className="car-select-block__cards">
            {userCars.map(car => (
              <CarCard
                isCardSelected={selectedCarId === car.id}
                key={car.id}
                car={car}
                onClick={onCardClicked}
                onDelete={onDelete}
                onChange={onCarInfoChange}
              />
            ))}
            <div className="car-select-block__button">
              <Button onClick={onSelectButtonClick}>Выбрать</Button>
            </div>
          </div>
        </BaseLayer>
      </Slider>
    </Fragment>
  );
};
