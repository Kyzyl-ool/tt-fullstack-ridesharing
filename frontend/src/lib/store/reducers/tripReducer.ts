import * as actions from '../actions/actionTypes';

const initialState = {
  rideTime: '',
  arrivalPoint: {},
  startOrganization: {
    id: '',
    label: ''
  },
  totalSeats: '',
  cost: '',
  isPlanned: false
};

export const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_START_ORGANIZATION:
      return { ...state, startOrganization: action.startOrganization };
    case actions.SET_ARRIVAL_POINT:
      return { ...state, arrivalPoint: action.arrivalPoint };
    case actions.SET_RIDE_TIME:
      return { ...state, rideTime: action.rideTime };
    case actions.SET_TOTAL_SEATS:
      return { ...state, totalSeats: action.totalSeats };
    case actions.SET_COST:
      return { ...state, cost: action.cost };
    case actions.CLEAN_CREATE_FORM:
      return initialState;
    default:
      return state;
  }
};
