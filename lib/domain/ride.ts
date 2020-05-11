import { ICar } from './car';
import { IPassenger, IDriver } from './driver';

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
  startOrganizationAddress: string;
  stopAddress: string;
  submitDatetime: string;
  startDatetime: string;
  hostAnswer: IHostAnswer;
  declineReason?: string;
}
