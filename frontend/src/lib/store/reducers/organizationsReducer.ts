import * as actions from '../actions/actionTypes';
import { IOrganization } from '../../domain/organization';

interface IState {
  organizations: IOrganization[];
  myOrganizations: IOrganization[];
}

const initialState = {
  organizations: [],
  myOrganizations: []
};

export const organizationsReducer = (state: IState = initialState, action) => {
  switch (action.type) {
    case actions.SET_ORGANIZATIONS:
      return { ...state, organizations: action.organizations };
    case actions.SET_MY_ORGANIZATIONS:
      return {
        ...state,
        myOrganizations: action.payload.myOrgs
      };
    default:
      return state;
  }
};
