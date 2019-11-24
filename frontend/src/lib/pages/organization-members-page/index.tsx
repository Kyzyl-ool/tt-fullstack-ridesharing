import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { Avatar } from '../../components/Avatar/Avatar';
import organizationsModel from '../../models/organizationsModel';

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await organizationsModel.getOrganizationMembers(orgId);
      setMembers(response);
    };

    fetchData();
  }, []);
  return (
    <Container>
      {members.map((value, index) => (
        <Paper key={index} className={classes.member}>
          <Avatar src={value.photo} />
          <Typography variant={'h5'} display={'inline'}>
            <b>{value.firstName}</b>
          </Typography>
          &nbsp;
          <Typography variant={'h5'} display={'inline'}>
            <b>{value.lastName}</b>
          </Typography>
        </Paper>
      ))}
    </Container>
  );
};
