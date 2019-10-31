import React, { useEffect, useState } from 'react';
import { Card, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import OrganizationsModel from '../../models/organizationsModel';
import { IOrganization } from '../../domain/organization';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: 200
    },
    padding1: {
      padding: theme.spacing(1)
    }
  })
);

interface INewOrganizationCard {
  organizations: IOrganization[];
  children?: React.ReactNode;
}

const NewOrganizationCard: React.FC<INewOrganizationCard> = ({ organizations, ...props }) => {
  const [value, setValue] = useState('');
  const classes = useStyles(props);

  const onSelect = id => {
    OrganizationsModel.joinOrganization(id).then(value1 => {});
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
            .filter(value1 => value1.name.toLowerCase().includes(value.toLowerCase()))
            .map((value1, index) => (
              <div key={index} onClick={() => onSelect(value1.id)}>
                <Paper className={classes.padding1}>
                  <Typography variant={'body1'}>{value1.name}</Typography>
                </Paper>
              </div>
            ))}
      </Paper>
    </Card>
  );
};

export default NewOrganizationCard;
