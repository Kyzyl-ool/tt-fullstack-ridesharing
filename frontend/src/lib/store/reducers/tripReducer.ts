import * as actions from '../actions/actionTypes';
import getTimeFromNow from '../../helpers/getTimeFromNow';

const initialState = {
  search: {
    rideTime: null,
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
    rideTime: null,
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
      return {
        ...state,
        [action.payload.flag]: { ...state[action.payload.flag], startOrganization: action.payload.startOrganization }
      };
    case actions.SET_ARRIVAL_POINT:
      return {
        ...state,
        [action.payload.flag]: { ...state[action.payload.flag], arrivalPoint: action.payload.arrivalPoint }
      };
    case actions.SET_RIDE_TIME:
      return { ...state, [action.payload.flag]: { ...state[action.payload.flag], rideTime: action.payload.rideTime } };
    case actions.SET_TOTAL_SEATS:
      return {
        ...state,
        [action.payload.flag]: { ...state[action.payload.flag], totalSeats: action.payload.totalSeats }
      };
    case actions.SET_COST:
      return { ...state, [action.payload.flag]: { ...state[action.payload.flag], cost: action.payload.cost } };
    case actions.CLEAN_CREATE_FORM:
      return initialState;
    default:
      return state;
  }
};
