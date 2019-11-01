import React, { useState } from 'react';
import { Button, Card, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import OrganizationsModel from '../../models/organizationsModel';
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

interface INewOrganizationCard {
  organizations: IOrganization[];
  myOrganizations: IOrganization[];
  children?: React.ReactNode;
}

const NewOrganizationCard: React.FC<INewOrganizationCard> = ({ organizations, myOrganizations, ...props }) => {
  const [value, setValue] = useState('');
  const classes = useStyles(props);

  const onSelect = id => {
    OrganizationsModel.joinOrganization(id).then(value1 => {
      console.log(value1);
    });
  };

  return (
    <Card className={classes.card}>
      <TextField
        variant={'outlined'}
        placeholder={'Выберите организацию...'}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Paper>
        {organizations &&
          organizations
            .filter(
              value1 =>
                myOrganizations.every(currentValue => currentValue.id !== value1.id) &&
                value1.name.toLowerCase().includes(value.toLowerCase())
            )
            .map((value1, index) => (
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

export default NewOrganizationCard;
