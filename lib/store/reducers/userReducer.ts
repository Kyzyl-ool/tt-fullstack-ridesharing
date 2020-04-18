import { IPassenger } from 'domain/driver';

const defaultUser: IPassenger = {
  firstName: '',
  lastName: '',
  id: null,
  photoUrl: '',
  rating: 0
};

const nearestOrganizationPlaceholder = 'Загружается...';

const defaultState = {
  user: { ...defaultUser },
  latitude: null,
  longitude: null,
  nearestOrganization: nearestOrganizationPlaceholder
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: { ...defaultUser, ...action.userInfo } };
    case 'UPDATE_GEOPOSITION':
      return { ...state, latitude: action.payload.latitude, longitude: action.payload.longitude };
    case 'UPDATE_NEAREST_ORGANIZATION':
      return { ...state, nearestOrganization: action.nearestOrganization };
    default:
      return state;
  }
};
