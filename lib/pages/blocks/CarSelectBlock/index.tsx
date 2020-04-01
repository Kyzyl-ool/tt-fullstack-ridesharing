import React, { Fragment, useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { CarCard } from 'components/CarCard';
import { Slider } from 'components/Slider';
import { Button } from 'components/Button';
import { GoBackArrow } from 'components/GoBackArrow';
import { ICar } from 'domain/car';
import UserModel from 'models/UserModel';
import './CarSelectBlock.scss';
import { PlusIcon } from '../../../icons';

type CarInfo = Omit<ICar, 'id'>;

interface ICarSelectBlock {
  visible: boolean;
  onGoBack: () => void;
  onCarInfoChange: (carId: string, carInformation: CarInfo) => void;
  onAddCar?: () => void;
  onCarSelect: (carId: string) => void;
  onDelete: (carId: string) => void;
  onClick?: (carId: string) => void;
  hideBackButton?: boolean;
}

export const CarSelectBlock = ({
  visible,
  onGoBack,
  onDelete,
  onCarInfoChange,
  onAddCar,
  onCarSelect,
  onClick,
  hideBackButton = false
}: ICarSelectBlock) => {
  const [selectedCarId, setSelectedCarId] = useState('');
  const [fetchedCars, setFetchedCars] = useState<ICar[]>(null);
  const [isCreatingNewCar, setIsCreatingNewCar] = useState<boolean>(false);
  const [newCarFilelds, setNewCarFields] = useState<{ model: string; registryNumber: string; color: string }>({
    color: 'Введите цвет',
    model: 'Введите модель',
    registryNumber: 'Введите номер'
  });

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
      {visible && !hideBackButton && <GoBackArrow onGoBack={onGoBack} className="car-select-block__back-arrow" />}
      <Slider visible={visible} timeout={600} from="bottom" unmountOnExit>
        <BaseLayer type="secondary" header="Выберите автомобиль" className="car-select-block__layer">
          <div className="car-select-block__cards">
            {!_isEmpty(fetchedCars) &&
              fetchedCars.map(car => (
                <CarCard
                  isCardSelected={selectedCarId === car.id}
                  key={car.id}
                  car={car}
                  onClick={onCardClicked}
                  onDelete={onDelete}
                  onChange={onCarInfoChange}
                />
              ))}
            {isCreatingNewCar && (
              <CarCard
                isCardSelected={true}
                car={{
                  ...newCarFilelds,
                  owner: '',
                  id: '0'
                }}
                onDelete={() => setIsCreatingNewCar(false)}
                onChange={(id, data) => setNewCarFields(data)}
                onClick={() => {}}
              />
            )}
            {onAddCar && (
              <li className={'car-card car-card-add-button'} onClick={() => onAddCar()}>
                <PlusIcon /> Добавить автомобиль
              </li>
            )}
            <div className="car-select-block__button">
              <Button onClick={onSelectButtonClick}>Выбрать</Button>
            </div>
          </div>
        </BaseLayer>
      </Slider>
    </Fragment>
  );
};
