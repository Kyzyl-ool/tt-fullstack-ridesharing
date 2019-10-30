export interface ITrip {
  startOrganizationId: number;
  stopLatitude: number;
  stopLongitude: number;
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
