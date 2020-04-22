// Template from https://uber.github.io/react-map-gl/docs/get-started/get-started
import React, { useState, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import ReactMapGL, { PointerEvent, FlyToInterpolator, Marker } from 'react-map-gl';
import { updateGeopositionAction, setActivePointAction } from 'store/actions/mapActions';
import './Map.scss';

interface IMapProps {
  className?: string;
  children?: ReactNode;
  onViewportChange?: (newPosition: { longitude: number; latitude: number }) => void;
  onMapClicked?: (newPosition: { longitude: number; latitude: number }) => void;
}

export const Map = ({ className = '', onViewportChange, onMapClicked }: IMapProps) => {
  const {
    activePointGps,
    isCustomPointsAllowed,
    isUserLocationAllowed,
    isGeopositionUpdateAllowed,
    isBlurred,
    isHidden,
    isDimmed
  } = useSelector(state => state.map);
  const { latitude: userLatitude, longitude: userLongitude } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const mapClassNames = classNames({
    'rsh-map': true,
    'rsh-map--blurred': isBlurred,
    'rsh-map--hidden': isHidden,
    'rsh-map--dimmed': isDimmed,
    [className]: true
  });

  const [viewport, setViewport] = useState({
    // type assertion is here 'cause library does not
    // know width and height could be strings
    width: ('100vw' as unknown) as number,
    height: ('100vh' as unknown) as number,
    latitude: 55.7972075,
    longitude: 37.5377682,
    zoom: 17,
    bearing: 0,
    pitch: 0,
    transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
    transitionDuration: 'auto'
  });

  const getInitialUserGeoposition = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }: Position) => {
        setViewport({ ...viewport, latitude, longitude });
        dispatch(updateGeopositionAction({ longitude, latitude }));
      },
      () => {},
      {
        timeout: 5000,
        enableHighAccuracy: true
      }
    );
  };

  useEffect(() => {
    if (isUserLocationAllowed) {
      getInitialUserGeoposition();
    }
  }, [isUserLocationAllowed]);

  // const onMapPositionChanged = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
  //   if (onViewportChange) {
  //     onViewportChange({ longitude, latitude });
  //   }
  //   dispatch(updateGeopositionAction({ longitude, latitude }));
  // };

  const onClick = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
    if (isCustomPointsAllowed) {
      dispatch(setActivePointAction({ longitude, latitude }));
    } else {
      if (isGeopositionUpdateAllowed) {
        dispatch(updateGeopositionAction({ longitude, latitude }));
      }
    }
    if (onMapClicked) {
      onMapClicked({ longitude, latitude });
    }
  };

  const onViewportPositionChange = newViewport => {
    setViewport(newViewport);
  };

  const renderCustomPin = () => {
    return (
      isCustomPointsAllowed &&
      activePointGps.longitude && (
        <Marker longitude={activePointGps.longitude} latitude={activePointGps.latitude}>
          <div className="rsh-map__active-pin" />
        </Marker>
      )
    );
  };

  const renderUserLocationPin = () => {
    const couldBeRendered = isUserLocationAllowed && userLatitude && userLongitude;
    return (
      couldBeRendered && (
        <Marker latitude={userLatitude} longitude={userLongitude}>
          <div className="rsh-map__pin" />
        </Marker>
      )
    );
  };

  return (
    <div className={mapClassNames}>
      <ReactMapGL
        {...viewport}
        dragRotate={false}
        // onMouseUp={onMapPositionChanged}
        // onTouchEnd={onMapPositionChanged}
        onClick={onClick}
        onViewportChange={onViewportPositionChange}
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/shinnik/ck18kcqmj04q61cqnjc7o84qs"
      >
        {renderCustomPin()}
        {renderUserLocationPin()}
      </ReactMapGL>
    </div>
  );
};
