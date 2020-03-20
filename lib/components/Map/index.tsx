// Template from https://uber.github.io/react-map-gl/docs/get-started/get-started
import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';
import ReactMapGL, { ViewportProps, PointerEvent } from 'react-map-gl';
import './Map.scss';

interface IMapProps {
  className?: string;
  children?: ReactNode;
  onViewportChange?: (newPosition: { longitude: number; latitude: number }) => void;
}

export const Map = ({ className = '', onViewportChange }: IMapProps) => {
  const mapClassNames = classNames({
    'rsh-map': true,
    [className]: true
  });

  const [viewport, setViewport] = useState({
    // type assertion is here 'cause library does not
    // know width and height could be strings
    width: ('100vw' as unknown) as number,
    height: ('100vh' as unknown) as number,
    latitude: 55.7972075,
    longitude: 37.5377682,
    zoom: 17
  });

  const onMapPositionChanged = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
    if (onViewportChange) {
      onViewportChange({ longitude, latitude });
    }
  };

  return (
    <div className={mapClassNames}>
      <ReactMapGL
        {...viewport}
        onMouseUp={onMapPositionChanged}
        onTouchEnd={onMapPositionChanged}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/shinnik/ck18kcqmj04q61cqnjc7o84qs"
      >
        <div className="rsh-map__pin" />
      </ReactMapGL>
    </div>
  );
};
