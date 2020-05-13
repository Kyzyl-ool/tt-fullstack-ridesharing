export interface ILocation {
  id: string;
  name: string;
  address: string;
}

export interface IDestination {
  address: string;
  gps: {
    latitude: number;
    longitude: number;
  };
}

export interface IDirectedDestination extends IDestination {
  fromOrganization: boolean;
}
