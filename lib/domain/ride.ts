import { ICar } from './car';
import { IPassenger, IDriver } from './driver';

export type IHostAnswer = 'ACCEPTED' | 'NO ANSWER' | 'DECLINED' | null;

export interface IRideCreationInfo {
  carId: string;
  startOrganizationId: string;
  stopLatitude: number;
  stopLongitude: number;
  totalSeats: string;
  price: string;
  startDatetime: string;
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
  startDatetime: string;
  hostAnswer: IHostAnswer;
}
