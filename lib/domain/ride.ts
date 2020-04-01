import { ICar } from './car';
import { IPassenger, IDriver } from './driver';

export interface IRideCreationInfo {
  carId: string;
  startOrganizationId: string;
  stopLatitude: number;
  stopLongitude: number;
  totalSeats: string;
  price: string;
}

export interface IRide {
  car: ICar;
  freeSeats: number;
  host: IDriver;
  id: number;
  passengers: IPassenger[];
  price: number;
  startOrganizationAddress: string;
  stopAddress: string;
  submitDatetime: string;
}
