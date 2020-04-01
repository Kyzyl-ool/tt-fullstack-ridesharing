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
import { PlusIcon } from '../../../icons';
import _debounce from 'lodash/debounce';

export type CarInfo = Omit<ICar, 'id'>;

interface ICarSelectBlock {
  visible: boolean;
  onGoBack: () => void;
  onCarInfoChange: (carId: string, carInformation: CarInfo) => void;
  onAddCar?: () => void;
  onCarSelect: (carId: string) => void;
  onDelete: (carId: string) => void;
  onClick?: (carId: string) => void;
  hideBackButton?: boolean;
  withBottomButton?: boolean;
}

export const CarSelectBlock = ({
  visible,
  onGoBack,
  onDelete,
  onCarInfoChange,
  onAddCar,
  onCarSelect,
  onClick,
  hideBackButton = false,
  withBottomButton = true
}: ICarSelectBlock) => {
  const [selectedCarId, setSelectedCarId] = useState('');
  const [fetchedCars, setFetchedCars] = useState<ICar[]>(null);
  const [isCreatingNewCar, setIsCreatingNewCar] = useState<boolean>(false);
  const [newCarFields, setNewCarFields] = useState<{
    model: string;
    registryNumber: string;
    color: string;
    id: number;
  }>({
    color: 'Введите цвет',
    model: 'Введите модель',
    registryNumber: 'Введите номер',
    id: 0
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

  const createCar = async () => {
    const res = await UserModel.putCar({
      model: newCarFields.model,
      color: newCarFields.color,
      registryNumber: newCarFields.registryNumber
    });
    setNewCarFields({
      ...newCarFields,
      id: res.id
    });
  };

  const deleteCar = async (id: number) => {
    // await UserModel.deleteCar({ id });
    // fetchCars();
  };

  const updateCarInfo = _debounce(
    async (id: number, carInfo: { model: string; registryNumber: string; color: string }) => {
      await UserModel.postCar({
        id,
        registryNumber: carInfo.registryNumber,
        color: carInfo.color,
        model: carInfo.model
      });
      fetchCars();
    },
    300
  );

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
                  isCardSelected={_isEqual(selectedCarId, car.id)}
                  key={car.id}
                  car={car}
                  onClick={onCardClicked}
                  onDelete={onDelete}
                  onChange={(id, data) => {
                    setNewCarFields({
                      registryNumber: data.number,
                      model: data.name,
                      color: data.color,
                      id
                    });
                    updateCarInfo(id, {
                      registryNumber: data.number,
                      model: data.name,
                      color: data.color
                    });
                  }}
                />
              ))}
            {isCreatingNewCar && (
              <CarCard
                car={{
                  owner: null,
                  ...newCarFields
                }}
                isCardSelected={true}
                onDelete={() => setIsCreatingNewCar(false)}
                onChange={(id, data) => {
                  setNewCarFields({
                    registryNumber: data.number,
                    model: data.name,
                    color: data.color,
                    id
                  });
                  updateCarInfo(id, {
                    registryNumber: data.number,
                    model: data.name,
                    color: data.color
                  });
                }}
                onClick={() => {}}
              />
            )}
            {onAddCar && (
              <li
                className={'car-card car-card-add-button'}
                onClick={async () => {
                  setIsCreatingNewCar(true);
                  onAddCar();
                  await createCar();
                }}
              >
                <PlusIcon /> Добавить автомобиль
              </li>
            )}
            {withBottomButton && fetchedCars.length < 4 && (
              <div className="car-select-block__button">
                <Button disabled={!selectedCarId} onClick={onSelectButtonClick}>
                  Выбрать
                </Button>
              </div>
            )}
          </div>
        </BaseLayer>
      </Slider>
    </Fragment>
  );
};
