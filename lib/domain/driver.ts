import { ICar } from './car';

export interface IDriver {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  phoneNumber: string;
  photoUrl: string;
}

export type IPassenger = Omit<IDriver, 'phoneNumber'>;
