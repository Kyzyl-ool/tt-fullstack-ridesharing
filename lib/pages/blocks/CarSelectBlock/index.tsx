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
import { PlusIcon } from '../../../icons';
import { CreateCarDialog } from './blocks/CreateCarDialog';
import { isLaptopMatchMedia, isPadMatchMedia } from 'helpers/matchers';
import { Header } from 'components/Header';
import './CarSelectBlock.scss';
import './CarSelectBlock.desktop.scss';

export type CarInfo = Omit<ICar, 'id' | 'owner'>;

interface ICarSelectBlock {
  visible: boolean;
  onGoBack: () => void;
  onCarInfoChange: (carId: string, carInformation: CarInfo) => void;
  onCarSelect: (carId: string) => void;
  onDelete: (carId: string) => void;
  onClick?: (carId: string) => void;
  hideBackButton?: boolean;
  withBottomButton?: boolean;
  withAddNewCarButton?: boolean;
  headerText?: string;
  withClickableCars?: boolean;
}

export const CarSelectBlock = ({
  visible,
  onGoBack,
  onDelete,
  onCarInfoChange,
  onCarSelect,
  onClick,
  hideBackButton = false,
  withBottomButton = true,
  withAddNewCarButton = false,
  headerText,
  withClickableCars = true
}: ICarSelectBlock) => {
  const [selectedCarId, setSelectedCarId] = useState('');
  const [fetchedCars, setFetchedCars] = useState<ICar[]>(null);
  const [isCreatingNewCar, setIsCreatingNewCar] = useState<boolean>(false);

  const isDesktop = isLaptopMatchMedia();
  const isTab = isPadMatchMedia();

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

  const createNewCar = async (carInfo: CarInfo) => {
    await UserModel.putCar(carInfo);
    setIsCreatingNewCar(false);
    await fetchCars();
  };

  useEffect(() => {
    setIsCreatingNewCar(false);
    fetchCars();
  }, []);

  return (
    <Fragment>
      {visible && (isTab || isDesktop) && <Header>Выберите автомобиль</Header>}
      {visible && !hideBackButton && <GoBackArrow onGoBack={onGoBack} className="car-select-block__back-arrow" />}
      <Slider visible={visible} timeout={600} from="bottom" unmountOnExit>
        <BaseLayer
          type="secondary"
          header={headerText ? headerText : 'Выберите автомобиль'}
          className="car-select-block__layer"
        >
          <div className="car-select-block__cards">
            {!_isEmpty(fetchedCars) &&
              fetchedCars.map(car => (
                <CarCard
                  isCardSelected={_isEqual(selectedCarId, car.id)}
                  key={car.id}
                  car={car}
                  onClick={onCardClicked}
                  onDelete={onDelete}
                  onChange={async (id, car) => {
                    await onCarInfoChange(id, car);
                    await fetchCars();
                  }}
                  withClickableCars={withClickableCars}
                />
              ))}
            {isCreatingNewCar && <CreateCarDialog onClose={() => setIsCreatingNewCar(false)} onReady={createNewCar} />}
            {(withAddNewCarButton || _isEmpty(fetchedCars)) && (
              <li
                className={'car-card car-card-add-button'}
                onClick={() => {
                  setIsCreatingNewCar(true);
                }}
              >
                <PlusIcon /> Добавить автомобиль
              </li>
            )}
            {withBottomButton && fetchedCars && fetchedCars.length < 4 && (
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
