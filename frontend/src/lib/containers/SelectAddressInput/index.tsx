import React from 'react';
import { Box, makeStyles, MenuItem, TextField } from '@material-ui/core';
import { IOrganization } from '../../domain/organization';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  menu: {
    width: 200
  }
}));

interface ISelectAddressInputProps {
  onSetStartOrganization: (startOrganization: { id: string; label: string }) => void;
  availableOrganizations: IOrganization[];
  startOrganization: { id: string; label: string };
}

export const SelectAddressInput: React.FunctionComponent<ISelectAddressInputProps> = props => {
  const classes = useStyles({});

  const onStartOrganizationChange = e => {
    const orgName = e.target.value;
    props.onSetStartOrganization({
      label: orgName,
      id: props.availableOrganizations.find(org => org.name === orgName).id
    });
  };
  return (
    <Box display={'flex'} alignItems={'center'} m={1}>
      <TextField
        fullWidth
        value={props.startOrganization.label || 'none'}
        onChange={onStartOrganizationChange}
        select
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
        variant="outlined"
      >
        <MenuItem value="none" disabled>
          Откуда?
        </MenuItem>
        {props.availableOrganizations.map((org, index) => (
          <MenuItem key={index} value={org.name}>
            {org.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
