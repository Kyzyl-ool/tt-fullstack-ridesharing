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
  console.log({ latitude, longitude });
  const nearestOrganizationsList = await MapModel.getNearestOrganization({ latitude, longitude });
  dispatch(updateNearestOrganizationAction(nearestOrganizationsList[0].name));
};
