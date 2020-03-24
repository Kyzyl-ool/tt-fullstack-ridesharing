// const getInitialUserGeoposition = () => {
//   navigator.geolocation.getCurrentPosition((position: Position) => )
// }

const defaultState = {
  latitude: null,
  longitude: null,
  nearestOrganization: 'Нет организаций'
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_GEOPOSITION':
      return { ...state, latitude: action.payload.latitude, longitude: action.payload.longitude };
    case 'UPDATE_NEAREST_ORGANIZATION':
      return { ...state, nearestOrganization: action.nearestOrganization };
    default:
      return state;
  }
};
