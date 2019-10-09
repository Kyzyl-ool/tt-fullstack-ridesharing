import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import ReactMapGL, { NavigationControl, GeolocateControl } from 'react-map-gl';
import Header from '../Header';
import styles from './Map.module.scss';

interface IMapState {
  viewport: IViewport;
}

interface IViewport {
  height: number | string;
  latitude: number;
  longitude: number;
  width: number | string;
  zoom: number;
}

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
const initialState = {
  viewport: {
    height: window.innerHeight * 0.8,
    latitude: 55.751244,
    longitude: 37.618423,
    width: window.innerWidth,
    zoom: 14,
  },
  initialPosition: {
    latitude: 55.751244,
    langitude: 37.618423,
  },
};
type State = typeof initialState;

export default class Map extends React.Component<{}, IMapState> {
  public state: State = initialState;
  public mapRef = React.createRef<ReactMapGL>();

  public componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
    this.getLocation();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  public getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.setState({
          viewport: {
            ...this.state.viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      });
    }
  };

  public updateViewport = (viewport: any) => {
    this.setState(prevState => ({
      viewport: { ...prevState.viewport, ...viewport },
    }));
  };

  public resize = () => {
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        height: window.innerHeight * 0.8,
        width: window.innerWidth,
      },
    }));
  };

  public render() {
    const { viewport } = this.state;
    return (
      <Fragment>
        <Header />
        <div className={styles.Map}>
          <ReactMapGL
            {...viewport}
            ref={this.mapRef}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onViewportChange={(v: any) => this.updateViewport(v)}
            mapStyle="mapbox://styles/shinnik/ck18kcqmj04q61cqnjc7o84qs"
          >
            <div style={{ position: 'absolute', right: 30, bottom: 30 }}>
              <NavigationControl onViewportChange={this.updateViewport} />
              <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
            </div>
          </ReactMapGL>
          <div className={styles.RoleButtonsContainer}>
            <div className={styles.RoleButtons}>
              {/* <Box display='flex' flexDirection='column'> */}
              <Button color="primary" size="large">
                Водитель
              </Button>
              <Button color="primary" size="large">
                Пассажир
              </Button>
              {/* </Box> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
