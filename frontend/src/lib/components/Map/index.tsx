import * as React from 'react';
import Button from '@material-ui/core/Button';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
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
    height: '80vh',
    latitude: 55.751244,
    longitude: 37.618423,
    width: '100vw',
    zoom: 14,
  },
};
type State = typeof initialState;
type Viewport = typeof initialState.viewport;

export default class Map extends React.Component<{}, IMapState> {
  public state: State = initialState;
  public mapRef = React.createRef<ReactMapGL>();

  public componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  public rusifyMap = () => {
    // replace all english labels with russian
    if (this.mapRef.current) {
      const map = this.mapRef.current.getMap();
      if (map) {
        const symbolicLabelIds = map
          .getStyle()
          .layers.filter(layer => layer.type === 'symbol')
          .map(labelLayer => labelLayer.id);
        if (symbolicLabelIds.length > 0) {
          symbolicLabelIds.forEach(id => map.setLayoutProperty(id, 'text-field', ['get', 'name']));
        }
      }
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
        height: window.innerHeight,
        width: window.innerWidth,
      },
    }));
  };

  public render() {
    const { viewport } = this.state;
    return (
      <div className={styles.Map}>
        <ReactMapGL
          {...viewport}
          ref={this.mapRef}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(v: any) => this.updateViewport(v)}
          mapStyle="mapbox://styles/shinnik/ck18kcqmj04q61cqnjc7o84qs"
          onLoad={() => {
            this.rusifyMap();
          }}
        >
          <div style={{ position: 'absolute', right: 30, bottom: 30 }}>
            <NavigationControl onViewportChange={this.updateViewport} />
          </div>
        </ReactMapGL>
        <div className={styles.RoleButtons}>
          <Button color="primary" size="large">
            Водитель
          </Button>
          <Button color="primary" size="large">
            Пассажир
          </Button>
        </div>
      </div>
    );
  }
}
