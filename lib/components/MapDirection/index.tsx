import React, { PureComponent, useEffect, useState } from 'react';
import { Source, Layer } from 'react-map-gl';
import axios from 'axios';
import MapModel from 'models/MapModel';

export const MapDirection = ({ line }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDirection = async () => {
      const geojson = await MapModel.getDirection(line.start, line.finish);
      setData(geojson);
    };
    fetchDirection();
  }, []);

  return (
    <Source id="route" type="geojson" data={data}>
      <Layer
        id="direction"
        type="line"
        layout={{
          'line-join': 'round',
          'line-cap': 'round'
        }}
        paint={{
          'line-width': 2,
          'line-color': 'red',
          'line-dasharray': [3, 3]
        }}
      />
    </Source>
  );
};
