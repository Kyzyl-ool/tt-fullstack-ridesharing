import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { Avatar } from '../../components/Avatar/Avatar';
import organizationsModel from '../../models/organizationsModel';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    member: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  })
);

export const OrganizationMembersPage: React.FC = ({ ...props }) => {
  const params = useParams() as any;
  const orgId = params.orgId;
  const [members, setMembers] = useState([]);
  const classes = useStyles(props);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await organizationsModel.getOrganizationMembers(orgId);
      setMembers(response.map(value => snakeObjectToCamel(value)));
    };

    fetchData();
  }, []);
  return (
    <Box mt={4} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
      {members.map((value, index) => (
        <Paper key={index} className={classes.member}>
          <Box m={2}>
            <Avatar src={value.photo} />
          </Box>
          <Typography variant={'h5'} display={'inline'}>
            <b>{value.firstName}</b>
          </Typography>
          &nbsp;
          <Typography variant={'h5'} display={'inline'}>
            <b>{value.lastName}</b>
          </Typography>
        </Paper>
      ))}
      <Button onClick={() => history.goBack()} variant={'text'} color={'default'}>
        Назад
      </Button>
    </Box>
  );
};
