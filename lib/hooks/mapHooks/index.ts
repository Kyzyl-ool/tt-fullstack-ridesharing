import { useEffect, useRef } from 'react';
import {
  setMapDimAction,
  resetMapDimAction,
  setMapBlurAction,
  resetMapBlurAction,
  setMapHideAction,
  resetMapHideAction,
  allowUserLocation,
  forbidUserLocation,
  allowGeopositionUpdateAction,
  forbidGeopositionUpdateAction
} from 'store/actions/mapActions';
import { useSelector, useDispatch } from 'react-redux';

export const useDimmedMap = (initialValue = false) => {
  const { isDimmed } = useSelector(state => state.map);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initialValue) {
      dispatch(setMapDimAction());
    } else {
      dispatch(resetMapDimAction());
    }
    return () => {
      dispatch(resetMapDimAction());
    };
  }, []);
  return [isDimmed, (newIsDimmed: boolean) => dispatch(newIsDimmed ? setMapDimAction() : resetMapDimAction())];
};

export const useBlurredMap = (initialValue = false) => {
  const { isBlurred } = useSelector(state => state.map);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initialValue) {
      dispatch(setMapBlurAction());
    } else {
      dispatch(resetMapBlurAction());
    }
    return () => {
      dispatch(resetMapBlurAction());
    };
  }, []);
  return [isBlurred, (newIsBlurred: boolean) => dispatch(newIsBlurred ? setMapBlurAction() : resetMapBlurAction())];
};

export const useHiddenMap = (initialValue = false) => {
  const { isHidden } = useSelector(state => state.map);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initialValue) {
      dispatch(setMapHideAction());
    } else {
      dispatch(resetMapHideAction());
    }
    return () => {
      dispatch(resetMapHideAction());
    };
  }, []);
  return [isHidden, (newIsHidden: boolean) => dispatch(newIsHidden ? setMapHideAction() : resetMapHideAction())];
};

export const useUserLocation = (initialValue = false) => {
  const { isUserLocationAllowed } = useSelector(state => state.map);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initialValue) {
      dispatch(allowUserLocation());
    } else {
      dispatch(forbidUserLocation());
    }
    return () => {
      dispatch(forbidUserLocation());
    };
  }, []);
  return [
    isUserLocationAllowed,
    (newIsUserLocationAllowed: boolean) =>
      dispatch(newIsUserLocationAllowed ? allowUserLocation() : forbidUserLocation())
  ];
};

export const useGeopositionUpdate = (initialValue = false) => {
  const { isGeopositionUpdateAllowed } = useSelector(state => state.map);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initialValue) {
      dispatch(allowGeopositionUpdateAction());
    } else {
      dispatch(forbidGeopositionUpdateAction());
    }
    return () => {
      forbidGeopositionUpdateAction();
    };
  }, []);
  return [
    isGeopositionUpdateAllowed,
    (newIsGeopositionUpdateAllowed: boolean) =>
      dispatch(newIsGeopositionUpdateAllowed ? allowGeopositionUpdateAction() : forbidGeopositionUpdateAction())
  ];
};
