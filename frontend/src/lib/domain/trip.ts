export interface ITrip {
  startOrganizationId: number;
  stopLatitude: number;
  stopLongitude: number;
  cost: number;
  carId: number;
  stopAddress: string;
  startTime: string;
  totalSeats: number;
  description: string;
}

export interface IFindRidesRequest {
  startTime: string;
  startOrganizationId: number;
  destinationLatitude: number;
  destinationLongitude: number;
}

export interface ITripCardData {
  name: string;
  from: string;
  to: string;
  time: string;
  amountOfFreeSpaces: number;
  cost: number;
}
