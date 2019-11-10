import React, { PureComponent, Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Typography, Container, makeStyles, Theme, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory, RouteComponentProps } from 'react-router';
import Map from '../../components/Map/index';
import MapModel from '../../models/mapModel';
import DropdownInput from '../../components/DropdownInput/index';
import getDataFromGeocoding from '../../helpers/getDataFromGeocoding';
const useStyles = makeStyles((theme: Theme) => ({
  address: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '36px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '44px'
    }
  },
  addressContainer: {
    top: '70px',
    maxWidth: '90%',
    padding: 0,
    position: 'absolute',
    textAlign: 'center',
    boxSizing: 'content-box'
  },
  inputWrapper: {
    bottom: '30px',
    padding: 0,
    position: 'absolute',
    maxWidth: '90%'
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px'
  },
  wrapper: {
    position: 'relative'
  },
  goButton: {
    alignSelf: 'center',
    marginBottom: '7px'
  },
  selectButtonContainer: {
    display: 'flex'
  }
}));

interface IAddress {
  label?: string;
  pos?: {
    lat: string;
    lng: string;
  };
}

interface ISelectedAddressContainerState {
  lastSelectedAddress: string;
  currentAddress: string;
  selectedAddress: IAddress;
  addressesSearched: IAddress[];
  selectionOptions: string[];
}

interface ISelectedAddressContainerProps {
  styles: any;
  history: RouteComponentProps['history'];
  onSetArrivalPoint: (arrivalPoint: { name: string; latitude: number; longitude: number }) => void;
}

const initialState: ISelectedAddressContainerState = {
  lastSelectedAddress: '',
  currentAddress: '',
  selectedAddress: {},
  addressesSearched: [],
  selectionOptions: []
};

class SelectAddressContainer extends PureComponent<ISelectedAddressContainerProps, ISelectedAddressContainerState> {
  public state = initialState;
  public onBuildingClick = async (address: string) => {
    const res = await MapModel.forwardGeocoding(address);
    if (res) {
      const { addresses } = getDataFromGeocoding(res);
      this.setState({ selectedAddress: addresses[0], lastSelectedAddress: address, currentAddress: address });
    }
  };
  public onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const address = e.currentTarget.value;
    const res = await MapModel.forwardGeocoding(e.currentTarget.value);
    if (res) {
      const geocodingData = getDataFromGeocoding(res);
      this.setState({
        selectionOptions: geocodingData.options,
        addressesSearched: geocodingData.addresses,
        currentAddress: address
      });
    } else {
      this.setState({
        currentAddress: '',
        selectionOptions: []
      });
    }
  };

  public onReady = () => {
    const { selectedAddress } = this.state;
    this.props.onSetArrivalPoint({
      name: selectedAddress.label,
      latitude: parseFloat(selectedAddress.pos.lat),
      longitude: parseFloat(selectedAddress.pos.lng)
    });
    // this.props.history.goBack();
  };

  public onSelectAddress = ({ id, value }: { id: string; value: string }) => {
    const selectedAddress = this.state.addressesSearched.find(adr => adr.label === value);
    this.setState({ selectionOptions: [], currentAddress: value, selectedAddress, lastSelectedAddress: value });
  };
  public render() {
    const { lastSelectedAddress, currentAddress, selectedAddress, selectionOptions } = this.state;
    const { styles } = this.props;
    const viewport = !_isEmpty(selectedAddress) && {
      latitude: parseFloat(selectedAddress.pos.lat),
      longitude: parseFloat(selectedAddress.pos.lng),
      zoom: 16
    };
    return (
      <Fragment>
        <Container className={styles.wrapper}>
          <Map viewport={viewport} onBuildingClick={this.onBuildingClick} markered />
          <Container className={styles.addressContainer}>
            <Typography className={styles.address} color="primary" component="h3" variant="h3">
              {lastSelectedAddress}
            </Typography>
          </Container>
          <Container className={styles.inputWrapper}>
            <Container className={styles.inputContainer}>
              <DropdownInput
                id="to"
                label="Введите адрес"
                value={currentAddress}
                placeholder=""
                suggestions={selectionOptions}
                onSelect={this.onSelectAddress}
                onChange={this.onInputChange}
              />
              <Button
                onClick={this.onReady}
                //   onClick={() => {}}
                variant="outlined"
                color="primary"
                disabled={!selectedAddress.label}
                className={styles.goButton}
              >
                Готово
              </Button>
            </Container>
          </Container>
        </Container>
      </Fragment>
    );
  }
}

const StyledSelectAddressContainer: React.FC<Omit<ISelectedAddressContainerProps, 'styles' | 'history'>> = props => {
  const styles = useStyles({});
  const history = useHistory();
  return <SelectAddressContainer {...props} history={history} styles={styles} />;
};

export default StyledSelectAddressContainer;
