import * as actions from '../actions/actionTypes';
import { IOrganization } from '../../domain/organization';

interface IState {
  organizations: IOrganization[];
}

const initialState = {
  organizations: []
};

export const organizationsReducer = (state: IState = initialState, action) => {
  switch (action.type) {
    case actions.SET_ORGANIZATIONS:
      return { ...state, organizations: action.organizations };
    default:
      return state;
  }
};
