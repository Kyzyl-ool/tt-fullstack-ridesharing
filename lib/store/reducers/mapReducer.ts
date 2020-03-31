const defaultState = {
  isCustomPointsAllowed: false,
  activePointGps: {
    latitude: null,
    longitude: null
  }
};

export const mapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ALLOW_CUSTOM_POINTS':
      return { ...state, isCustomPointsAllowed: true };
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
