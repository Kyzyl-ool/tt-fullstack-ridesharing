import { ICar } from './car';
import { IPassenger, IDriver } from './driver';
import { IOrganization } from './organization';
import { ILocation } from './map';

export type IHostAnswer = 'ACCEPTED' | 'NO ANSWER' | 'DECLINED' | null;

export interface IRideCreationInfo {
  carId: string;
  organizationId: string;
  latitude: number;
  longitude: number;
  totalSeats: string;
  price: string;
  startDatetime: string;
  fromOrganization: boolean;
}

export interface IRequest {
  rideId: string;
  user: IPassenger;
}

export interface IRide {
  car: ICar;
  freeSeats: number;
  host: IDriver;
  id: number;
  passengers: IPassenger[];
  price: number;
  organization: ILocation;
  address: string;
  submitDatetime: string;
  startDatetime: string;
  hostAnswer: IHostAnswer;
  declineReason?: string;
  fromOrganization: boolean;
}

export type IHistoryRide = Pick<IRide, 'address' | 'host' | 'id' | 'price' | 'startDatetime' | 'submitDatetime'> & {
  organizationName: string;
  stopDatetime: string;
};
