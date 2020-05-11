const defaultState = {
  isCustomPointsAllowed: false,
  isUserLocationAllowed: false,
  isGeopositionUpdateAllowed: false,
  isBlurred: false,
  isHidden: false,
  isDimmed: false,
  activePointGps: {
    latitude: null,
    longitude: null
  }
};

export const mapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'RESET_MAP':
      return { ...defaultState };
    case 'SET_MAP_BLUR':
      return { ...state, isBlurred: true };
    case 'RESET_MAP_BLUR':
      return { ...state, isBlurred: false };
    case 'SET_MAP_HIDE':
      return { ...state, isHidden: true };
    case 'RESET_MAP_HIDE':
      return { ...state, isHidden: false };
    case 'SET_MAP_DIM':
      return { ...state, isDimmed: true };
    case 'RESET_MAP_DIM':
      return { ...state, isDimmed: false };
    case 'ALLOW_CUSTOM_POINTS':
      return { ...state, isCustomPointsAllowed: true };
    case 'ALLOW_USER_LOCATION':
      return { ...state, isUserLocationAllowed: true };
    case 'FORBID_USER_LOCATION':
      return { ...state, isUserLocationAllowed: false };
    case 'ALLOW_GEOPOSITION_UPDATE':
      return { ...state, isGeopositionUpdateAllowed: true };
    case 'FORBID_GEOPOSITION_UPDATE':
      return { ...state, isGeopositionUpdateAllowed: false };
    case 'FORBID_CUSTOM_POINTS':
      return { ...state, isCustomPointsAllowed: false };
    case 'SET_CUSTOM_GEOPOSITION':
      return state.isCustomPointsAllowed
        ? { ...state, activePointGps: { latitude: action.payload.latitude, longitude: action.payload.longitude } }
        : state;
    default:
      return state;
  }
};
