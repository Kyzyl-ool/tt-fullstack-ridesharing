// Template from https://uber.github.io/react-map-gl/docs/get-started/get-started
import React, { useState, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import ReactMapGL, { PointerEvent } from 'react-map-gl';
import { updateGeopositionAction } from 'store/actions/mapActions';
import './Map.scss';

interface IMapProps {
  className?: string;
  children?: ReactNode;
  onViewportChange?: (newPosition: { longitude: number; latitude: number }) => void;
  onMapClicked?: (newPosition: { longitude: number; latitude: number }) => void;
}

export const Map = ({ className = '', onViewportChange, onMapClicked }: IMapProps) => {
  const mapClassNames = classNames({
    'rsh-map': true,
    [className]: true
  });

  const dispatch = useDispatch();

  const [viewport, setViewport] = useState({
    // type assertion is here 'cause library does not
    // know width and height could be strings
    width: ('100vw' as unknown) as number,
    height: ('100vh' as unknown) as number,
    latitude: 55.7972075,
    longitude: 37.5377682,
    zoom: 17
  });

  // const [currentPosition, setCurrentPosition] = useState(null);

  const getInitialUserGeoposition = () => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }: Position) => {
      // setCurrentPosition({ latitude, longitude });
      setViewport({ ...viewport, latitude, longitude });
      dispatch(updateGeopositionAction({ longitude, latitude }));
    });
  };

  useEffect(() => {
    getInitialUserGeoposition();
  }, []);

  const onMapPositionChanged = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
    if (onViewportChange) {
      onViewportChange({ longitude, latitude });
    }
    dispatch(updateGeopositionAction({ longitude, latitude }));
  };

  const onClick = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
    setViewport({ ...viewport, longitude, latitude });
    if (onMapClicked) {
      onMapClicked({ longitude, latitude });
    }
  };

  return (
    <div className={mapClassNames}>
      <ReactMapGL
        {...viewport}
        onMouseUp={onMapPositionChanged}
        onTouchEnd={onMapPositionChanged}
        onClick={onClick}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/shinnik/ck18kcqmj04q61cqnjc7o84qs"
      >
        <div className="rsh-map__pin" />
      </ReactMapGL>
    </div>
  );
};
