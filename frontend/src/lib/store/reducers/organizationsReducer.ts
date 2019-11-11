import * as actions from '../actions/actionTypes';
import { IOrganization } from '../../domain/organization';

interface IState {
  organizations: IOrganization[];
  myOrganizations: IOrganization[];
  create: {
    organizationAddress?: {
      name?: string;
      latitude?: number;
      longitude?: number;
    };
  };
}

const initialState = {
  organizations: [],
  myOrganizations: [],
  create: {
    organizationAddress: {}
  }
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
    case actions.SET_NEW_ORGANIZATION_ADDRESS:
      return {
        ...state,
        create: { ...state.create, organizationAddress: action.organizationAddress }
      };
    default:
      return state;
  }
};
