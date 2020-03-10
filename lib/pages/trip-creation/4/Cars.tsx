import React, { useEffect, useState } from 'react';
import { CarCard, CarDataType } from '../../../components/CarCard/CarCard';
import '../../../theme/typography.scss';
import { BaseLayer } from '../../../components/BaseLayer/BaseLayer';

const Cars = () => {
  const [cars, setCars] = useState<CarDataType[]>();

  useEffect(() => {
    setCars([
      {
        name: 'Audi Q8',
        color: 'черный',
        number: '(TY901O)',
        id: 8,
        text: 'пассажиры в среднем оценивают чистоту салона на 9.1/10'
      },
      {
        name: 'Audi Q8',
        color: 'черный',
        number: '(TY901O)',
        id: 89,
        text: 'пассажиры в среднем оценивают чистоту салона на 9.1/10'
      },
      {
        name: 'Audi Q8',
        color: 'черный',
        number: '(TY901O)',
        id: 80,
        text: 'пассажиры в среднем оценивают чистоту салона на 9.1/10'
      }
    ]);
  }, []);

  const onDelete = id => {
    console.log(id, 'has been deleted');
  };

  const onNewChanges = (id, data: CarDataType) => {
    console.log(id, 'has new data:', data);
    //send post request
    const newCars = Array.from(cars);
    // const changedCar = newCars.find(value => value.id === id);
    const index = newCars.findIndex(value => value.id === id);
    newCars[index] = {
      ...newCars[index],
      ...data
    };
    setCars(newCars);
  };

  return (
    <BaseLayer type={'SECONDARY'} header={'Выберите автомобиль'}>
      {cars &&
        cars.map(value => (
          <CarCard
            key={value.id}
            name={value.name}
            number={value.number}
            color={value.color}
            text={value.text}
            id={value.id}
            onDelete={onDelete}
            onNewChanges={onNewChanges}
          />
        ))}
    </BaseLayer>
  );
};

export default Cars;
