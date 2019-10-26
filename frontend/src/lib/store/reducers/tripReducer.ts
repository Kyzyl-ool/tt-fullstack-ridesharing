import * as actions from '../actions/actionTypes';

const initialState = {
  time: '',
  destinationPoint: {},
  startOrganization: {},
  numberOfPassengers: '',
  cost: '',
  isPlanned: false
};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_START_ORGANIZATION:
      return { ...state, startOrganization: action.startOrganization };
  }
};
