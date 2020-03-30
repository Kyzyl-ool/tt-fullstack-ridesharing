import MapModel from 'models/MapModel';

export const updateNearestOrganizationAction = nearestOrganization => {
  return {
    type: 'UPDATE_NEAREST_ORGANIZATION',
    nearestOrganization
  };
};

export const updateGeopositionAction = ({ latitude, longitude }) => async dispatch => {
  dispatch({
    type: 'UPDATE_GEOPOSITION',
    payload: {
      latitude,
      longitude
    }
  });
  const nearestOrganizationsList = await MapModel.getNearestOrganization({ latitude, longitude });
  dispatch(updateNearestOrganizationAction(nearestOrganizationsList[0].name));
};

export const setActivePointAction = ({ latitude, longitude }) => {
  return {
    type: 'SET_CUSTOM_GEOPOSITION',
    payload: {
      latitude,
      longitude
    }
  };
};

export const allowCustomPointsAction = () => {
  return {
    type: 'ALLOW_CUSTOM_POINTS'
  };
};

export const forbidCustomPointsAction = () => {
  return {
    type: 'FORBID_CUSTOM_POINTS'
  };
};
