import React, { useState } from 'react';
import { Box, createStyles, makeStyles, TextField, Theme, Button, Container, Modal } from '@material-ui/core';
import { connect } from 'react-redux';
import SelectAddressContainer from '../../containers/SelectAddressContainer';
import { setNewOrganizationAddressAction } from '../../store/actions/organizationActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      marginTop: theme.spacing(1)
    },
    mapButton: {
      whiteSpace: 'nowrap',
      marginLeft: '8px',
      minWidth: 'fit-content'
    },
    inputWrapper: {
      width: '100%'
    }
  })
);

interface IAddNewOrganizationPageProps {
  organizationAddress: { name: string; latitude: number; longitude: number };
  onSetAddress: (organizationAddress: { name: string; latitude: number; longitude: number }) => void;
}

const AddNewOrganizationPage: React.FC<IAddNewOrganizationPageProps> = props => {
  const classes = useStyles(props);
  const [isModalShown, setIsModalShown] = useState(false);
  // const []

  const onSelectAddress = (organizationAddress: { name: string; latitude: number; longitude: number }) => {
    setIsModalShown(false);
    props.onSetAddress(organizationAddress);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <TextField
        fullWidth={true}
        className={classes.marginTop}
        variant={'outlined'}
        type={'text'}
        placeholder={'Введите название организации'}
      />
      <Box className={classes.inputWrapper} display={'flex'} alignItems={'center'} m={1}>
        <TextField
          fullWidth
          placeholder={'Куда?'}
          variant={'outlined'}
          value={props.organizationAddress.name}
          onChange={() => {}}
        />
        <Button className={classes.mapButton} onClick={() => setIsModalShown(true)}>
          На карте
        </Button>
      </Box>
      <Modal open={isModalShown} onClose={() => setIsModalShown(false)}>
        <SelectAddressContainer onSetArrivalPoint={onSelectAddress} />
      </Modal>
      <Button className={classes.marginTop}>Добавить</Button>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    organizationAddress: state.org.create.organizationAddress
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAddress: address => dispatch(setNewOrganizationAddressAction(address))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewOrganizationPage);
