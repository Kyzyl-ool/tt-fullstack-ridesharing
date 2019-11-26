import React, { useState } from 'react';
import { Box, Button, Card, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import OrganizationsModel from '../../models/organizationsModel';
import addNotification from '../../store/actions/notificationsActions';
import { IOrganization } from '../../domain/organization';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: 200,
      marginTop: theme.spacing(4)
    },
    noTextDecoration: {
      textDecoration: 'none'
    },
    greyBack: {
      backgroundColor: 'rgba(0,0,0,0.06)'
    },
    form: {
      height: '20px'
    }
  })
);

interface INotification {
  text: string;
  type: 'success' | 'failure';
}

interface INewOrganizationCardProps {
  organizations: IOrganization[];
  myOrganizations: IOrganization[];
  children?: React.ReactNode;
  addNotification: (notification: INotification) => void;
}

const NewOrganizationCard: React.FC<INewOrganizationCardProps> = ({ organizations, myOrganizations, ...props }) => {
  const [value, setValue] = useState('');
  const classes = useStyles(props);
  const filteredOrganizations = organizations.filter(
    value1 =>
      myOrganizations.every(currentValue => currentValue.id !== value1.id) &&
      value1.name.toLowerCase().includes(value.toLowerCase())
  );

  const onSelect = async id => {
    const res = await OrganizationsModel.joinOrganization(id);
    if (res) {
      props.addNotification({ text: 'Вы присоединились к организации', type: 'success' });
    } else {
      props.addNotification({ text: 'Присоединится к организации не удалось', type: 'failure' });
    }
  };

  return (
    <Card className={classes.card}>
      <TextField
        variant={'outlined'}
        placeholder={filteredOrganizations.length ? 'Имя организации...' : 'Нет доступных организаций'}
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!filteredOrganizations.length}
        fullWidth
      />
      <Box className={classes.greyBack} px={1}>
        <Typography variant={'caption'}>
          Доступные организации перечислены ниже. Для фильтрации списка воспользуйтесь поиском. Чтобы присоединиться к
          организации, нажмите на неё.
        </Typography>
      </Box>
      <Box>
        {organizations &&
          filteredOrganizations.map((value1, index) => (
            <Box key={index} mt={1}>
              <Paper>
                <Box onClick={() => onSelect(value1.id)} p={1} mx={1}>
                  <Typography variant={'body1'}>{value1.name}</Typography>
                </Box>
              </Paper>
            </Box>
          ))}
        <div>
          <Box className={classes.greyBack} px={1}>
            <Typography variant={'caption'}>Также вы можете создать свою организацию:</Typography>
          </Box>
          <Box p={1}>
            <NavLink to={'/new_organization'} className={classes.noTextDecoration}>
              <Button variant={'text'} color={'primary'}>
                Создать новую организацию
              </Button>
            </NavLink>
          </Box>
        </div>
      </Box>
    </Card>
  );
};

const mapDispatchToProps = {
  addNotification
};

export default connect(null, mapDispatchToProps)(NewOrganizationCard);
