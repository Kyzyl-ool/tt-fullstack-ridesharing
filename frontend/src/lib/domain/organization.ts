import { IUser } from './user';

export interface IOrganization {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  users: IUser[];
}
