import React, { memo, PureComponent } from 'react';
import Map from '../../components/Map';
import Header from '../../components/Header';
import MapModel from '../../models/mapModel';
import DropdownInput from '../../components/DropdownInput';
import getDataFromGeocoding from '../../helpers/getDataFromGeocoding';
import { Typography, Container, makeStyles, Theme, Button } from '@material-ui/core';

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
    maxWidth: 'none',
    top: '140px'
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
  currentAddressFrom: string;
  selectedAddressFrom: IAddress;
  selectedAddressTo: IAddress;
  currentAddressTo: string;
  addressesSearchedFrom: IAddress[];
  addressesSearchedTo: IAddress[];
  selectionOptionsFrom: string[];
  selectionOptionsTo: string[];
}

interface ISelectedAddressPageProps {
  styles: any;
}

const initialState: ISelectedAddressPageState = {
  lastSelectedAddress: '',
  currentAddressFrom: '',
  currentAddressTo: '',
  selectedAddressFrom: {},
  selectedAddressTo: {},
  addressesSearchedFrom: [],
  addressesSearchedTo: [],
  selectionOptionsFrom: [],
  selectionOptionsTo: []
};

class SelectAddressPage extends PureComponent<ISelectedAddressPageProps, ISelectedAddressPageState> {
  public state = initialState;
  public onBuildingClick = (address: string) => this.setState({ lastSelectedAddress: address });
  public onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const address = e.currentTarget.value;
    const res = await MapModel.forwardGeocoding(e.currentTarget.value);
    if (res) {
      const geocodingData = getDataFromGeocoding(res);
      if (e.target.id === 'from') {
        this.setState({
          selectionOptionsFrom: geocodingData.options,
          addressesSearchedFrom: geocodingData.addresses,
          currentAddressFrom: address
        });
      } else {
        this.setState({
          selectionOptionsTo: geocodingData.options,
          addressesSearchedTo: geocodingData.addresses,
          currentAddressTo: address
        });
      }
    } else {
      this.setState({
        currentAddressTo: '',
        currentAddressFrom: '',
        selectionOptionsFrom: [],
        selectionOptionsTo: []
      });
    }
  };
  public onSelectAddress = ({ id, value }: { id: string; value: string }) => {
    if (id === 'from') {
      const selectedAddressFrom = this.state.addressesSearchedFrom.find(adr => adr.label === value);
      this.setState({ selectionOptionsFrom: [], currentAddressFrom: value, selectedAddressFrom });
    } else {
      const selectedAddressTo = this.state.addressesSearchedTo.find(adr => adr.label === value);
      this.setState({ selectionOptionsTo: [], currentAddressTo: value, selectedAddressTo });
    }
  };
  public render() {
    const {
      lastSelectedAddress,
      currentAddressFrom,
      selectedAddressFrom,
      selectedAddressTo,
      selectionOptionsFrom,
      selectionOptionsTo,
      currentAddressTo
    } = this.state;
    const { styles } = this.props;
    return (
      <div>
        <Header />
        <Map onBuildingClick={this.onBuildingClick} />
        <Container className={styles.addressContainer}>
          <Typography className={styles.address} color="primary" component="h3" variant="h3">
            {lastSelectedAddress}
          </Typography>
        </Container>
        <Container className={styles.wrapper}>
          <Container className={styles.inputContainer}>
            <DropdownInput
              id="to"
              label="Введите организацию"
              value={currentAddressTo}
              placeholder=""
              suggestions={selectionOptionsTo}
              onSelect={this.onSelectAddress}
              onChange={this.onInputChange}
            />
            {/* <Button size="small">На карте</Button> */}
          </Container>
          <Button
            onClick={() => console.log(selectedAddressFrom, selectedAddressTo)}
            variant="outlined"
            color="primary"
            disabled={!selectedAddressFrom.label || !selectedAddressTo.label}
            className={styles.goButton}
          >
            Готово
          </Button>
        </Container>
      </div>
    );
  }
}

const StyledSelectAddressPage: React.FC = props => {
  const styles = useStyles({});
  return <SelectAddressPage {...props} styles={styles} />;
};

export default memo(StyledSelectAddressPage);
