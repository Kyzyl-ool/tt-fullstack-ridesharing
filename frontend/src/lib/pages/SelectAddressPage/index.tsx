import React, { useState, memo } from 'react';
import Map from '../../components/Map';
import Header from '../../components/Header';
import { Typography, Container, makeStyles, Theme, Button, Box } from '@material-ui/core';

// interface ISelectAddressPageProps {}

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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '20vh'
  }
}));

const SelectAddressPage: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const onBuildingClick = async (address: string) => setSelectedAddress(address);
  const styles = useStyles({});
  return (
    <div>
      <Header />
      <Map onBuildingClick={onBuildingClick} />
      <Container className={styles.addressContainer}>
        <Typography className={styles.address} color="primary" component="h3" variant="h3">
          {selectedAddress}
        </Typography>
      </Container>
      <Container className={styles.buttonContainer}>
        <Button color="primary" size="large">
          Водитель
        </Button>
        <Button color="primary" size="large">
          Пассажир
        </Button>
      </Container>
    </div>
  );
};

export default memo(SelectAddressPage);
