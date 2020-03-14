// Template from https://uber.github.io/react-map-gl/docs/get-started/get-started
import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';
import ReactMapGL, { InteractiveMapProps } from 'react-map-gl';
import './Map.scss';

interface IMapProps {
  className?: string;
  children: ReactNode;
}

export const Map = ({ className = '' }: IMapProps) => {
  const mapClassNames = classNames({
    'rsh-map': true,
    [className]: true
  });

  const [viewport, setViewport] = useState({
    // type assertion is here 'cause library does not
    // know width and height could be strings
    width: ('inherit' as unknown) as number,
    height: ('inherit' as unknown) as number,
    latitude: 55.7972075,
    longitude: 37.5377682,
    zoom: 17
  });

  return (
    <div className={mapClassNames}>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/shinnik/ck18kcqmj04q61cqnjc7o84qs"
      >
        <div className="rsh-map__pin" />
      </ReactMapGL>
    </div>
  );
};
