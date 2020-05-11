import React, { Fragment, useState, useEffect, useMemo } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { useSelector, useDispatch } from 'react-redux';
import _debounce from 'lodash/debounce';
import { Header } from 'components/Header';
import { Slider } from 'components/Slider';
import { Input } from 'components/Input';
import { DestinationsList } from 'components/DestinationsList';
import { IDestination, IDirectedDestination } from 'domain/map';
import MapModel from 'models/MapModel';
import { Button } from 'components/Button';
import { allowCustomPointsAction, forbidCustomPointsAction } from 'store/actions/mapActions';
import './DestinationSelectBlock.scss';

interface IDestinationSelectBlock {
  onGoBack: () => void;
  onSelectDestination: (dest: Pick<IDirectedDestination, 'gps' | 'fromOrganization'>) => void;
  onConfirmAddress: (gps: IDirectedDestination) => void;
  startOrganizationName: string;
  visible: boolean;
}

export const DestinationSelectBlock = ({
  onGoBack,
  visible,
  onSelectDestination,
  onConfirmAddress,
  startOrganizationName
}: IDestinationSelectBlock) => {
  const [matchedDestinations, setMatchedDestinations] = useState([]);
  const [isMapShown, setIsMapShown] = useState(false);
  const [fromOrganization, setFromOrganization] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState('');
  const addressName = useMemo(
    () =>
      selectedAddress
        ? selectedAddress
            .split(', ')
            .slice(-2)
            .join(', ')
        : '',
    [selectedAddress]
  );
  const { activePointGps } = useSelector(state => state.map);

  const dispatch = useDispatch();

  const onDestinationSearch = _debounce(async (value: string) => {
    const destinations = await MapModel.forwardGeocoding(value);
    setMatchedDestinations(destinations);
  }, 300);

  const fetchAddress = async ({ latitude, longitude }) => {
    const res = await MapModel.reverseGeocoding({ latitude, longitude });
    setSelectedAddress(res.address);
  };

  useEffect(() => {
    // effect allowing custom pins on the map
    if (isMapShown) {
      dispatch(allowCustomPointsAction());
    }
    return () => dispatch(forbidCustomPointsAction());
  }, [isMapShown]);

  useEffect(() => {
    if (activePointGps.latitude && activePointGps.longitude) {
      fetchAddress(activePointGps);
    }
  }, [activePointGps]);

  useEffect(() => {
    if (addressName) {
      onDestinationSearch(addressName);
    }
  }, [addressName]);

  const onMapButtonClick = () => {
    setIsMapShown(true);
  };

  const renderMapButton = () => {
    return (
      <>
        <div onClick={onMapButtonClick} className="destination-select-block__map-button" /> <div>На карте</div>
      </>
    );
  };

  const onConfirmButtonClick = () => {
    setIsMapShown(false);
    onConfirmAddress({
      address: selectedAddress,
      gps: activePointGps,
      fromOrganization
    });
  };

  const onBackIconClick = () => {
    setIsMapShown(false);
    onGoBack();
  };

  const onDestinationSelected = ({ latitude, longitude }: IDirectedDestination['gps']) => {
    console.log(fromOrganization);
    onSelectDestination({ gps: { latitude, longitude }, fromOrganization });
  };

  const renderOrganizationInput = () => {
    return (
      <Input
        id="departure"
        defaultValue={startOrganizationName}
        className="destination-select-block__input destination-select-block__input--organization"
        placeholderText=""
        icon={<div className="destination-select-block__input-icon--from" />}
      />
    );
  };

  const renderPointInput = () => {
    return (
      <Input
        id="arrival"
        className="destination-select-block__input"
        defaultValue={addressName}
        placeholderText=""
        icon={<div className="destination-select-block__input-icon--to" />}
        onChange={onDestinationSearch}
        renderRightAdornment={renderMapButton}
        adornmentClassName="destination-select-block__adornment"
      />
    );
  };

  return (
    <Fragment>
      {visible && (
        <Header iconType="back" onIconClick={onBackIconClick}>
          {`Укажите пункт ${fromOrganization ? 'назначения' : 'отправления'}`}
        </Header>
      )}
      <Slider visible={visible && !isMapShown} from="top" timeout={400} unmountOnExit>
        <div>
          <div className="destination-select-block__input-form">
            {fromOrganization ? (
              <>
                {renderOrganizationInput()}
                {renderPointInput()}
                <div className="destination-select-block__button-wrapper">
                  <Button
                    className="destination-select-block__switch-button"
                    onClick={() => setFromOrganization(false)}
                  >
                    {'Ехать к организации'}
                  </Button>
                </div>
              </>
            ) : (
              <>
                {renderPointInput()}
                {renderOrganizationInput()}
                <div className="destination-select-block__button-wrapper">
                  <Button className="destination-select-block__switch-button" onClick={() => setFromOrganization(true)}>
                    {'Ехать от организации'}
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="destination-select-block__destinations-list">
            <DestinationsList text="" destinations={matchedDestinations} onSelectDestination={onDestinationSelected} />
          </div>
        </div>
      </Slider>
      <Fragment>
        {isMapShown && (
          <div className="destination-select-block__map-form">
            <Input
              disabled
              defaultValue={addressName}
              id="address"
              className="destination-select-block__input"
              placeholderText="Выберите место на карте"
            />
            <Button onClick={onConfirmButtonClick} filled disabled={_isEmpty(selectedAddress)}>
              Подтвердить
            </Button>
          </div>
        )}
      </Fragment>
    </Fragment>
  );
};
