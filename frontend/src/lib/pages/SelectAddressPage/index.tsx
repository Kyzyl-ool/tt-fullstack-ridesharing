import React, { memo, PureComponent, Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import Map from '../../components/Map';
import Header from '../../components/Header';
import MapModel from '../../models/mapModel';
import DropdownInput from '../../components/DropdownInput';
import getDataFromGeocoding from '../../helpers/getDataFromGeocoding';
import { Typography, Container, makeStyles, Theme, Button } from '@material-ui/core';
import { connect } from 'react-redux';
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
    position: 'absolute',
    // maxWidth: 'none',
    top: '140px',
    width: '100%'
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '20vh',
    justifyContent: 'space-between'
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

interface ISelectedAddressPageState {
  lastSelectedAddress: string;
  currentAddress: string;
  selectedAddress: IAddress;
  addressesSearched: IAddress[];
  selectionOptions: string[];
}

interface ISelectedAddressPageProps {
  styles: any;
}

const initialState: ISelectedAddressPageState = {
  lastSelectedAddress: '',
  currentAddress: '',
  selectedAddress: {},
  addressesSearched: [],
  selectionOptions: []
};

class SelectAddressPage extends PureComponent<ISelectedAddressPageProps, ISelectedAddressPageState> {
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
  public onSelectAddress = ({ id, value }: { id: string; value: string }) => {
    const selectedAddress = this.state.addressesSearched.find(adr => adr.label === value);
    this.setState({ selectionOptions: [], currentAddress: value, selectedAddress });
  };
  public render() {
    const { lastSelectedAddress, currentAddress, selectedAddress, selectionOptions } = this.state;
    const { styles } = this.props;
    const viewport = !_isEmpty(selectedAddress) && {
      latitude: parseFloat(selectedAddress.pos.lat),
      longitude: parseFloat(selectedAddress.pos.lng),
      zoom: 18
    };
    return (
      <Fragment>
        <Header />
        <Map viewport={viewport} onBuildingClick={this.onBuildingClick} />
        <Container className={styles.addressContainer}>
          <Typography className={styles.address} color="primary" component="h3" variant="h3">
            {lastSelectedAddress}
          </Typography>
        </Container>
        <Container className={styles.wrapper}>
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
          </Container>
          <Button
            onClick={() => {}}
            variant="outlined"
            color="primary"
            disabled={!selectedAddress.label}
            className={styles.goButton}
          >
            Готово
          </Button>
        </Container>
      </Fragment>
    );
  }
}

const StyledSelectAddressPage: React.FC = props => {
  const styles = useStyles({});
  return <SelectAddressPage {...props} styles={styles} />;
};

export default memo(StyledSelectAddressPage);
