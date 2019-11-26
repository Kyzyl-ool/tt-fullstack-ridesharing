import React, { useState } from 'react';
import { Box, Button, createStyles, makeStyles, Modal, TextField, Theme } from '@material-ui/core';
import { connect } from 'react-redux';
import SelectAddressContainer from '../../containers/SelectAddressContainer';
import { setNewOrganizationAddressAction } from '../../store/actions/organizationActions';
import organizationsModel from '../../models/organizationsModel';
import userModel from '../../models/userModel';
import { useHistory } from 'react-router';

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
  const [name, setName] = useState('');
  const [desription, setDesription] = useState('');
  const history = useHistory();

  const onSelectAddress = (organizationAddress: { name: string; latitude: number; longitude: number }) => {
    setIsModalShown(false);
    props.onSetAddress(organizationAddress);
  };

  const onCreateOrganization = () => {
    const handle = async () => {
      const myData = await userModel.getUserData();
      const myId = myData.id;
      const res = await organizationsModel.create(
        name,
        props.organizationAddress.latitude,
        props.organizationAddress.longitude,
        [myId],
        props.organizationAddress.name,
        desription
      );

      console.log('Create organization result: ', res);
    };

    try {
      handle().then(value => {
        history.push('/organizations');
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={4}>
      <TextField
        fullWidth={true}
        className={classes.marginTop}
        variant={'outlined'}
        type={'text'}
        placeholder={'Название новой организации'}
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <Box className={classes.inputWrapper} display={'flex'} alignItems={'center'} m={1}>
        <TextField
          fullWidth
          placeholder={'Адрес новой организации'}
          variant={'outlined'}
          value={props.organizationAddress.name}
          onChange={() => {}}
        />
        <Button className={classes.mapButton} onClick={() => setIsModalShown(true)}>
          На карте
        </Button>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} className={classes.inputWrapper}>
        <TextField
          fullWidth
          rows={6}
          placeholder={'Добавьте описание...'}
          variant={'outlined'}
          multiline
          value={desription}
          onChange={event => setDesription(event.target.value)}
        />
      </Box>
      <Modal open={isModalShown} onClose={() => setIsModalShown(false)}>
        <SelectAddressContainer onSetArrivalPoint={onSelectAddress} />
      </Modal>
      <Button className={classes.marginTop} onClick={onCreateOrganization}>
        Добавить
      </Button>
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
