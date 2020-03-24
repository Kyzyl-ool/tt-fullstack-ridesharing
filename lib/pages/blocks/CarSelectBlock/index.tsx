import React, { Fragment } from 'react';
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
  onCarSelect: () => void;
  onDelete: (carId: string) => void;
}

export const CarSelectBlock = ({
  visible,
  userCars,
  onGoBack,
  onDelete,
  onCarInfoChange,
  onCarSelect
}: ICarSelectBlock) => {
  return (
    <Fragment>
      {visible && <GoBackArrow onGoBack={onGoBack} className="car-select-block__back-arrow" />}
      <Slider visible={visible} timeout={600} from="bottom" unmountOnExit>
        <BaseLayer type="secondary" header="Выберите автомобиль" className="car-select-block__layer">
          <div className="car-select-block__cards">
            {userCars.map(car => (
              <CarCard key={car.id} car={car} onDelete={onDelete} onChange={onCarInfoChange} />
            ))}
            <div className="car-select-block__button">
              <Button onClick={onCarSelect}>Выбрать</Button>
            </div>
          </div>
        </BaseLayer>
      </Slider>
    </Fragment>
  );
};
