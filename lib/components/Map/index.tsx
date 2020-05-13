// Template from https://uber.github.io/react-map-gl/docs/get-started/get-started
import React, { useState, ReactNode, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import ReactMapGL, { PointerEvent, FlyToInterpolator, Marker, GeolocateControl } from 'react-map-gl';
import {
  updateGeopositionAction,
  setActivePointAction,
  forbidUserLocation,
  allowUserLocation
} from 'store/actions/mapActions';
import './Map.scss';
import MapModel from 'models/MapModel';
import { OrganizationMarker } from 'components/OrganizationMarker';
import { IDestination, ILocation } from 'domain/map';
import { MapDirection } from 'components/MapDirection';

interface IMapProps {
  className?: string;
  children?: ReactNode;
  onViewportChange?: (newPosition: { longitude: number; latitude: number }) => void;
  onMapClicked?: (newPosition: { longitude: number; latitude: number }) => void;
}

export const Map = ({ className = '', onViewportChange, onMapClicked }: IMapProps) => {
  const {
    activePointGps,
    activePointType,
    isCustomPointsAllowed,
    isUserLocationAllowed,
    isGeopositionUpdateAllowed,
    isBlurred,
    isHidden,
    isDimmed,
    lines,
    points,
    center
  } = useSelector(state => state.map);
  const { authorized } = useSelector(state => state.auth);
  const { latitude: userLatitude, longitude: userLongitude, organizations } = useSelector(state => state.user);
  const [fetchedOrganizations, setFetchedOrganizations] = useState<(ILocation & IDestination)[]>([]);
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
    latitude: 55.7493817,
    longitude: 37.6254686,
    zoom: 13,
    bearing: 0,
    pitch: 0,
    transitionInterpolator: new FlyToInterpolator({ speed: 1.7 }),
    transitionDuration: 'auto'
  });

  const getInitialUserGeoposition = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }: Position) => {
        setViewport({ ...viewport, latitude, longitude });
        dispatch(updateGeopositionAction({ longitude, latitude }));
        dispatch(allowUserLocation());
      },
      () => {
        dispatch(forbidUserLocation());
      },
      {
        timeout: 5000,
        enableHighAccuracy: true
      }
    );
  };

  useEffect(() => {
    if (authorized) {
      getInitialUserGeoposition();
    }
  }, [authorized]);

  useEffect(() => {
    if (!_isEmpty(lines)) {
      setViewport({
        ...viewport,
        zoom: 9
      });
    }
  }, [lines]);

  useEffect(() => {
    if (!_isEmpty(center)) {
      setViewport({
        ...viewport,
        latitude: center.latitude,
        longitude: center.longitude
      });
    }
  }, [center]);

  //temporary effect for geocoding organizations
  // TODO remove when /organizations will sent coords inside response
  useEffect(() => {
    const organizationGeocoding = async () => {
      const decodedOrganizations = await Promise.all<Array<any>>(
        organizations.map(org => MapModel.forwardGeocoding(org.address))
      );
      setFetchedOrganizations(
        decodedOrganizations
          .map(org => org[0])
          .map(org => {
            const orgToMerge = organizations.find(oldOrg => oldOrg.address === org.address);
            return { ...orgToMerge, gps: org.gps };
          })
      );
    };
    organizationGeocoding();
  }, [organizations]);

  useEffect(() => {
    if (activePointGps.longitude && activePointGps.latitude) {
      setViewport({ ...viewport, latitude: activePointGps.latitude, longitude: activePointGps.longitude });
    }
  }, [activePointGps]);

  const onClick = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
    if (isCustomPointsAllowed) {
      dispatch(setActivePointAction({ longitude, latitude }, activePointType));
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
    const customPinsClassNames = classNames({
      'rsh-map__active-pin': activePointType === 'default',
      'rsh-map__organization-pin': activePointType === 'organization'
    });
    return (
      isCustomPointsAllowed &&
      activePointGps.longitude && (
        <Marker longitude={activePointGps.longitude} latitude={activePointGps.latitude}>
          <div className={customPinsClassNames} />
        </Marker>
      )
    );
  };

  const renderPoint = () => {
    return (
      <>
        {points.map(point => (
          <Marker key={point.latitude} longitude={parseFloat(point.longitude)} latitude={parseFloat(point.latitude)}>
            <div className="rsh-map__active-pin" />
          </Marker>
        ))}
      </>
    );
  };

  const renderUserLocationPin = () => {
    const canBeRendered = isUserLocationAllowed && userLatitude && userLongitude;
    return (
      canBeRendered && (
        <Marker latitude={userLatitude} longitude={userLongitude}>
          <div className="rsh-map__pin" />
        </Marker>
      )
    );
  };

  const renderOrganizationMarkers = () => {
    // index = 0 is nearest organization
    return (
      <>
        {fetchedOrganizations.length > 0 &&
          fetchedOrganizations.map((organization, index) => (
            <OrganizationMarker key={organization.name} organization={organization} />
          ))}
      </>
    );
  };

  return (
    <div className={mapClassNames}>
      <ReactMapGL
        {...viewport}
        dragRotate={false}
        onClick={onClick}
        onViewportChange={onViewportPositionChange}
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/shinnik/ck18kcqmj04q61cqnjc7o84qs"
      >
        {renderCustomPin()}
        {renderUserLocationPin()}
        {renderOrganizationMarkers()}
        {!_isEmpty(lines) && lines.map(line => <MapDirection key={line.start.latitude} line={line} />)}
        {!_isEmpty(points) && renderPoint()}
        <GeolocateControl
          style={{
            position: 'fixed',
            top: '70px',
            right: 0
          }}
          showUserLocation={false}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGL>
    </div>
  );
};
