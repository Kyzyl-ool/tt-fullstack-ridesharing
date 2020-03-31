import { IDriverType, IPassengerType, ITripCard } from '../components/TripCard/TripCard';

export const sampleAvatarSrc = 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png';

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
    mark: 2.7,
    avararSrc: sampleAvatarSrc
  }
];

export const sampleFoundTrips: ITripCard[] = [
  {
    driver: {
      firstName: 'Алексей',
      secondName: 'Кожарин',
      vacations: 2,
      car: 'Mazda RX-7',
      avatarSrc: sampleAvatarSrc,
      mark: 7
    },
    time: '17:00',
    cost: 130,
    from: 'Mail.ru Corp',
    to: 'Дикси продуктовый магазин',
    tripId: '1',
    passengers: [
      {
        avararSrc: sampleAvatarSrc,
        firstName: 'Иван',
        secondName: 'Ивванов',
        mark: 8,
        id: 2
      },
      {
        avararSrc: sampleAvatarSrc,
        firstName: 'Иван',
        secondName: 'Ивванов',
        mark: 7,
        id: 4
      },
      {
        avararSrc: sampleAvatarSrc,
        firstName: 'Иван',
        secondName: 'Ивванов',
        mark: 3,
        id: 3
      }
    ]
  },
  {
    driver: {
      firstName: 'Алексей',
      secondName: 'Кожарин',
      vacations: 2,
      car: 'Mazda RX-7',
      avatarSrc: sampleAvatarSrc,
      mark: 7
    },
    time: '17:00',
    cost: 130,
    from: 'Mail.ru Corp',
    to: 'Дикси продуктовый магазин',
    tripId: '2',
    passengers: [
      {
        avararSrc: sampleAvatarSrc,
        firstName: 'Иван',
        secondName: 'Ивванов',
        mark: 8,
        id: 2
      },
      {
        avararSrc: sampleAvatarSrc,
        firstName: 'Иван',
        secondName: 'Ивванов',
        mark: 7,
        id: 4
      },
      {
        avararSrc: sampleAvatarSrc,
        firstName: 'Иван',
        secondName: 'Ивванов',
        mark: 3,
        id: 3
      }
    ]
  },
  {
    driver: {
      firstName: 'Алексей',
      secondName: 'Кожарин',
      vacations: 2,
      car: 'Mazda RX-7',
      avatarSrc: sampleAvatarSrc,
      mark: 7
    },
    time: '17:00',
    cost: 130,
    from: 'Mail.ru Corp',
    to: 'Дикси продуктовый магазин',
    tripId: '3',
    passengers: [
      {
        avararSrc: sampleAvatarSrc,
        firstName: 'Иван',
        secondName: 'Ивванов',
        mark: 8,
        id: 2
      },
      {
        avararSrc: sampleAvatarSrc,
        firstName: 'Иван',
        secondName: 'Ивванов',
        mark: 7,
        id: 4
      },
      {
        avararSrc: sampleAvatarSrc,
        firstName: 'Иван',
        secondName: 'Ивванов',
        mark: 3,
        id: 3
      }
    ]
  }
];
