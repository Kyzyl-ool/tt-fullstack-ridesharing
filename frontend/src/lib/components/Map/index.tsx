import React, { PureComponent } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import MapGL, { Source, Layer, NavigationControl, GeolocateControl, Marker } from '@urbica/react-map-gl';
import MapModel from '../../models/mapModel';
import './Map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';

interface IViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface IPoint {
  latitude: number;
  longitude: number;
}

interface IRoute {
  coordinates: Array<number[]>;
  type: string;
}

interface IUrbicaMapProps {
  style?: React.CSSProperties;
  onBuildingClick: (selectedBuildingAddress: string) => void;
  viewport?: IViewport;
  geopositionCentered?: boolean;
  markered?: boolean;
  withRoute?: boolean;
  startPoint?: IPoint;
  endPoint?: IPoint;
}

interface IUrbicaMapState {
  viewport: IViewport;
  route?: IRoute;
}

class UrbicaMap extends PureComponent<IUrbicaMapProps, IUrbicaMapState> {
  public state = {
    viewport: {
      latitude: 37.78,
      longitude: -122.41,
      zoom: 15
    }
  };

  public componentDidMount() {
    const { geopositionCentered, startPoint, endPoint, viewport } = this.props;
    if (geopositionCentered) {
      this.getInitialLocation();
    }
    if (!_isEmpty(viewport)) {
      this.setState({ viewport: viewport });
    }
    if (!_isEmpty(startPoint) && !_isEmpty(endPoint)) {
      this.getRoute(startPoint, endPoint);
    }
  }

  public componentDidUpdate(prevProps: IUrbicaMapProps) {
    if (!_isEmpty(this.props.viewport)) {
      if (prevProps.viewport !== this.props.viewport) {
        this.setState({ viewport: this.props.viewport });
      }
    }
  }

  public getRoute = async (startPoint: IPoint, endPoint: IPoint) => {
    const data = await MapModel.getRoute(startPoint, endPoint);
    const route = _get(data, 'routes[0].geometry');
    this.setState({ route });
  };

  public getAddress = async ({ lng, lat }: { lng: number; lat: number }): Promise<string> => {
    const data = await MapModel.reverseGeocoding({ longitude: lng, latitude: lat });
    const address = _get(data, 'response.GeoObjectCollection.featureMember[0].GeoObject.name');
    return address ? address : '';
  };

  public onBuildingClick = async (data: any): Promise<void> => {
    if ('lngLat' in data) {
      const { onBuildingClick: cb } = this.props;
      const selectedAddress = await this.getAddress(data.lngLat);
      cb(selectedAddress);
    }
  };

  public getInitialLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          viewport: {
            ...this.state.viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      });
    }
  };

  public render() {
    const { viewport, route } = this.state;
    const {
      style = { width: '100%', height: '70vh' },
      markered = false,
      startPoint = {} as IPoint,
      endPoint = {} as IPoint,
      withRoute = false
    } = this.props;
    return (
      <>
        <MapGL
          style={style}
          mapStyle="mapbox://styles/shinnik/ck1odtfa809g21dmptqma3hmh/draft"
          accessToken={MAPBOX_ACCESS_TOKEN}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          onViewportChange={(viewport: IViewport) => this.setState({ viewport })}
        >
          <Source id="building" type="vector" url="mapbox://mapbox.mapbox-streets-v8" />
          <Layer
            id="building"
            type="fill"
            source="building"
            source-layer="building"
            paint={{
              'fill-color': 'rgba(219,203,179, 0.3)',
              'fill-outline-color': 'rgba(219,203,179, 1)'
            }}
            onClick={this.onBuildingClick}
          />
          {withRoute && !_isEmpty(route) && (
            <>
              {' '}
              <Source
                id="route"
                type="geojson"
                data={{
                  type: 'Feature',
                  geometry: route
                }}
              />
              <Layer
                id="route"
                type="line"
                source="route"
                paint={{
                  'line-color': '#512DA8',
                  'line-width': 3
                }}
              />
            </>
          )}
          {markered && (
            <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
              <div className="map__center-marker"></div>
            </Marker>
          )}
          {!_isEmpty(startPoint) && !_isEmpty(endPoint) && (
            <>
              <Marker title="Start point" latitude={startPoint.latitude} longitude={startPoint.longitude}>
                <div className="map__start-point-marker"></div>
              </Marker>
              <Marker title="End point" latitude={endPoint.latitude} longitude={endPoint.longitude}>
                <div className="map__end-point-marker"></div>
              </Marker>
            </>
          )}
          <NavigationControl showCompass showZoom position="bottom-right" />
          <GeolocateControl position="bottom-right" />
        </MapGL>
      </>
    );
  }
}

export default UrbicaMap;
