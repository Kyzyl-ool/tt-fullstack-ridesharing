import React, { Fragment, useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { CarCard } from 'components/CarCard';
import { Slider } from 'components/Slider';
import { Button } from 'components/Button';
import { GoBackArrow } from 'components/GoBackArrow';
import { ICar } from 'domain/car';
import UserModel from 'models/UserModel';
import './CarSelectBlock.scss';

type CarInfo = Omit<ICar, 'id'>;

interface ICarSelectBlock {
  visible: boolean;
  onGoBack: () => void;
  onCarInfoChange: (carId: string, carInformation: CarInfo) => void;
  onCarSelect: (carId: string) => void;
  onDelete: (carId: string) => void;
  onClick?: (carId: string) => void;
}

export const CarSelectBlock = ({
  visible,
  onGoBack,
  onDelete,
  onCarInfoChange,
  onCarSelect,
  onClick
}: ICarSelectBlock) => {
  const [selectedCarId, setSelectedCarId] = useState('');
  const [fetchedCars, setFetchedCars] = useState<ICar[]>(null);

  const onCardClicked = (carId: string) => {
    setSelectedCarId(carId);
    if (onClick) {
      onClick(carId);
    }
  };

  const onSelectButtonClick = () => {
    onCarSelect(selectedCarId);
  };

  const fetchCars = async () => {
    const cars = await UserModel.getCars();
    setFetchedCars(cars);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Fragment>
      {visible && <GoBackArrow onGoBack={onGoBack} className="car-select-block__back-arrow" />}
      <Slider visible={visible} timeout={600} from="bottom" unmountOnExit>
        <BaseLayer type="secondary" header="Выберите автомобиль" className="car-select-block__layer">
          <div className="car-select-block__cards">
            {!_isEmpty(fetchedCars) &&
              fetchedCars.map(car => (
                <CarCard
                  isCardSelected={_isEqual(selectedCarId, car.id)}
                  key={car.id}
                  car={car}
                  onClick={onCardClicked}
                  onDelete={onDelete}
                  onChange={onCarInfoChange}
                />
              ))}
            <div className="car-select-block__button">
              <Button disabled={!selectedCarId} onClick={onSelectButtonClick}>
                Выбрать
              </Button>
            </div>
          </div>
        </BaseLayer>
      </Slider>
    </Fragment>
  );
};
