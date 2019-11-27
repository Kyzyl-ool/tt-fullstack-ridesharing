import * as actions from '../actions/actionTypes';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';

const initialState = {
  cars: [{}]
};

export const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CARS:
      return { ...state, cars: action.cars.map(car => snakeObjectToCamel(car)) };
    default:
      return state;
  }
};
