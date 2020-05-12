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
  },
  activePointType: 'default',
  lines: []
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
    case 'UPDATE_CUSTOM_POINT_TYPE':
      return { ...state, activePointType: action.pointType };
    case 'SET_CUSTOM_GEOPOSITION':
      return state.isCustomPointsAllowed
        ? {
            ...state,
            activePointGps: { latitude: action.payload.latitude, longitude: action.payload.longitude },
            activePointType: action.payload.pointType
          }
        : state;
    case 'SET_LINE':
      return { ...state, lines: [...state.lines, action.payload] };
    case 'RESET_LINES':
      return { ...state, lines: [...defaultState.lines] };
    default:
      return state;
  }
};
