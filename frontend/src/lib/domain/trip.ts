export interface ITrip {
  startOrganizationId: number;
  stopLatitude: number;
  stopLongitude: number;
  stopAddress: string;
  startTime: string;
  totalSeats: number;
  description: string;
}

export interface ITripCardData {
  name: string;
  from: string;
  to: string;
  time: string;
  amountOfFreeSpaces: number;
  cost: number;
}
