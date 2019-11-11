import * as actions from './actionTypes';

export const setNewOrganizationAddressAction = organizationAddress => {
  return {
    type: actions.SET_NEW_ORGANIZATION_ADDRESS,
    organizationAddress
  };
};
