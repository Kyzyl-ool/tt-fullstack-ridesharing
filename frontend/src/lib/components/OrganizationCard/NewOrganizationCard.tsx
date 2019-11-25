import React, { useState } from 'react';
import { Button, Card, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import OrganizationsModel from '../../models/organizationsModel';
import addNotification from '../../store/actions/notificationsActions';
import { IOrganization } from '../../domain/organization';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: 200
    },
    padding1: {
      padding: theme.spacing(1)
    },
    noTextDecoration: {
      textDecoration: 'none'
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
        placeholder={filteredOrganizations.length ? 'Выберите организацию...' : 'Нет доступных организаций'}
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!filteredOrganizations.length}
      />
      <Paper>
        {organizations &&
          filteredOrganizations.map((value1, index) => (
            <div key={index} onClick={() => onSelect(value1.id)}>
              <Paper className={classes.padding1}>
                <Typography variant={'body1'}>{value1.name}</Typography>
              </Paper>
            </div>
          ))}
        <div>
          <NavLink to={'/new_organization'} className={classes.noTextDecoration}>
            <Button variant={'text'} color={'primary'}>
              Создать новую организацию
            </Button>
          </NavLink>
        </div>
      </Paper>
    </Card>
  );
};

const mapDispatchToProps = {
  addNotification
};

export default connect(
  null,
  mapDispatchToProps
)(NewOrganizationCard);
