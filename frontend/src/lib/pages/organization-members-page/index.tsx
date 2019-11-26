import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Box, Button, Container, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { Avatar } from '../../components/Avatar/Avatar';
import organizationsModel from '../../models/organizationsModel';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';
import { useHistory } from 'react-router';
import './org-memgers-page.css';

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
            <Badge
              overlap={'circle'}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              badgeContent={value.isDriver ? <span className={'badge'} /> : null}
            >
              <Avatar src={value.photoUrl} />
            </Badge>
          </Box>
          <Typography variant={'h5'} display={'inline'}>
            {value.firstName}
          </Typography>
          &nbsp;
          <Typography variant={'h5'} display={'inline'}>
            {value.lastName}
          </Typography>
        </Paper>
      ))}
      <Button onClick={() => history.goBack()} variant={'text'} color={'default'}>
        Назад
      </Button>
    </Box>
  );
};
