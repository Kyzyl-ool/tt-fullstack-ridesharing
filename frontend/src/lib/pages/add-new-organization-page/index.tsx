import React from 'react';
import { Box, createStyles, makeStyles, TextField, Theme, Button } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      marginTop: theme.spacing(1)
    }
  })
);

export const AddNewOrganizationPage: React.FC = props => {
  const classes = useStyles(props);

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <TextField
        fullWidth={true}
        className={classes.marginTop}
        variant={'outlined'}
        type={'text'}
        placeholder={'Введите название организации'}
      />
      <TextField
        fullWidth={true}
        className={classes.marginTop}
        variant={'outlined'}
        type={'text'}
        placeholder={'Введите адрес организации'}
      />
      <Button className={classes.marginTop}>Добавить</Button>
    </Box>
  );
};
