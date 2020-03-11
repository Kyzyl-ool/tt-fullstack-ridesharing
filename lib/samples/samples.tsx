import { IDriverType, IPassengerType } from '../components/TripCard/TripCard';

export const sampleDriver: IDriverType = {
  car: 'Audi Q8',
  firstName: 'Кежик',
  secondName: 'Кызыл-оол',
  vacations: 3
};

export const samplePassengers: IPassengerType[] = [
  {
    firstName: 'Кежик',
    secondName: 'Кызыл-оол',
    id: 1,
    mark: 2.7
  }
];

export const sampleAvatarSrc = 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png';
