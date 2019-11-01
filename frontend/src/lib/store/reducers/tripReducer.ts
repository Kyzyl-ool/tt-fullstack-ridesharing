import * as actions from '../actions/actionTypes';

const initialState = {
  search: {
    rideTime: '',
    arrivalPoint: {},
    startOrganization: {
      id: '',
      label: ''
    },
    totalSeats: '',
    cost: '',
    isPlanned: false
  },
  create: {
    rideTime: '',
    arrivalPoint: {},
    startOrganization: {
      id: '',
      label: ''
    },
    totalSeats: '',
    cost: '',
    isPlanned: false
  }
};

export const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_START_ORGANIZATION:
      return { ...state, [action.flag]: { startOrganization: action.startOrganization } };
    case actions.SET_ARRIVAL_POINT:
      return { ...state, [action.flag]: { arrivalPoint: action.arrivalPoint } };
    case actions.SET_RIDE_TIME:
      return { ...state, [action.flag]: { rideTime: action.rideTime } };
    case actions.SET_TOTAL_SEATS:
      return { ...state, [action.flag]: { totalSeats: action.totalSeats } };
    case actions.SET_COST:
      return { ...state, [action.flag]: { cost: action.cost } };
    case actions.CLEAN_CREATE_FORM:
      return initialState;
    default:
      return state;
  }
};
