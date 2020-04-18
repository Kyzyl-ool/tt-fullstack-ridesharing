import { IDriver, IPassenger } from 'domain/driver';
import { IRide } from 'domain/ride';

export const sampleAvatarSrc = 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png';

export const sampleDriver: IDriver = {
  car: 'Audi Q8',
  firstName: 'Кежик',
  lastName: 'Кызыл-оол',
  vacations: 3
};

export const samplePassengers: IPassenger[] = [
  {
    firstName: 'Кежик',
    lastName: 'Кызыл-оол',
    id: 1,
    rating: 2.7,
    photoUrl: sampleAvatarSrc
  }
];

export const sampleFoundTrips: IRide[] = [
  {
    host: {
      id: 14,
      firstName: 'Алексей',
      lastName: 'Кожарин',
      phoneNumber: '+79665557788',
      photoUrl: sampleAvatarSrc,
      rating: 7
    },
    submitDatetime: '17:00',
    freeSeats: 3,
    car: {
      id: 22,
      owner: 14,
      model: 'Toyota Camry',
      registryNumber: 'у564ук',
      color: 'Красный'
    },
    price: 130,
    startOrganizationAddress: 'Mail.ru Corp',
    stopAddress: 'Дикси продуктовый магазин',
    id: 1,
    passengers: [
      {
        photoUrl: sampleAvatarSrc,
        firstName: 'Иван',
        lastName: 'Ивванов',
        rating: 8,
        id: 2
      },
      {
        photoUrl: sampleAvatarSrc,
        firstName: 'Иван',
        lastName: 'Ивванов',
        rating: 7,
        id: 4
      },
      {
        photoUrl: sampleAvatarSrc,
        firstName: 'Иван',
        lastName: 'Ивванов',
        rating: 3,
        id: 3
      }
    ]
  },
  {
    host: {
      id: 14,
      firstName: 'Алексей',
      lastName: 'Кожарин',
      phoneNumber: '+79665557788',
      photoUrl: sampleAvatarSrc,
      rating: 7
    },
    submitDatetime: '17:00',
    freeSeats: 3,
    car: {
      id: 22,
      owner: 14,
      model: 'Toyota Camry',
      registryNumber: 'у564ук',
      color: 'Красный'
    },
    price: 130,
    startOrganizationAddress: 'Mail.ru Corp',
    stopAddress: 'Дикси продуктовый магазин',
    id: 1,
    passengers: [
      {
        photoUrl: sampleAvatarSrc,
        firstName: 'Иван',
        lastName: 'Ивванов',
        rating: 8,
        id: 2
      },
      {
        photoUrl: sampleAvatarSrc,
        firstName: 'Иван',
        lastName: 'Ивванов',
        rating: 7,
        id: 4
      },
      {
        photoUrl: sampleAvatarSrc,
        firstName: 'Иван',
        lastName: 'Ивванов',
        rating: 3,
        id: 3
      }
    ]
  },
  {
    host: {
      id: 14,
      firstName: 'Алексей',
      lastName: 'Кожарин',
      phoneNumber: '+79665557788',
      photoUrl: sampleAvatarSrc,
      rating: 7
    },
    submitDatetime: '17:00',
    freeSeats: 3,
    car: {
      id: 22,
      owner: 14,
      model: 'Toyota Camry',
      registryNumber: 'у564ук',
      color: 'Красный'
    },
    price: 130,
    startOrganizationAddress: 'Mail.ru Corp',
    stopAddress: 'Дикси продуктовый магазин',
    id: 1,
    passengers: [
      {
        photoUrl: sampleAvatarSrc,
        firstName: 'Иван',
        lastName: 'Ивванов',
        rating: 8,
        id: 2
      },
      {
        photoUrl: sampleAvatarSrc,
        firstName: 'Иван',
        lastName: 'Ивванов',
        rating: 7,
        id: 4
      },
      {
        photoUrl: sampleAvatarSrc,
        firstName: 'Иван',
        lastName: 'Ивванов',
        rating: 3,
        id: 3
      }
    ]
  }
];
