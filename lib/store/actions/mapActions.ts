import MapModel from 'models/MapModel';
import _isEmpty from 'lodash/isEmpty';

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
  if (_isEmpty(nearestOrganizationsList)) {
    dispatch(updateNearestOrganizationAction('Нет организаций'));
  } else {
    dispatch(updateNearestOrganizationAction(nearestOrganizationsList[0].name));
  }
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

export const allowUserLocation = () => {
  return {
    type: 'ALLOW_USER_LOCATION'
  };
};

export const forbidUserLocation = () => {
  return {
    type: 'FORBID_USER_LOCATION'
  };
};

export const allowGeopositionUpdateAction = () => {
  return {
    type: 'ALLOW_GEOPOSITION_UPDATE'
  };
};

export const forbidGeopositionUpdateAction = () => {
  return {
    type: 'FORBID_GEOPOSITION_UPDATE'
  };
};

export const setMapHideAction = () => {
  return {
    type: 'SET_MAP_HIDE'
  };
};

export const resetMapHideAction = () => {
  return {
    type: 'RESET_MAP_HIDE'
  };
};

export const setMapBlurAction = () => {
  return {
    type: 'SET_MAP_BLUR'
  };
};

export const resetMapBlurAction = () => {
  return {
    type: 'RESET_MAP_BLUR'
  };
};

export const setMapDimAction = () => {
  return {
    type: 'SET_MAP_DIM'
  };
};

export const resetMapDimAction = () => {
  return {
    type: 'RESET_MAP_DIM'
  };
};
