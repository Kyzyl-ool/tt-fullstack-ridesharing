import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';

interface IOrganizationCardProps {
  name: string;
  amountOfPeople: number;
  amountOfDrivers: number;
  address: string;
  organizationPhotoSrc?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      objectFit: 'contain'
    },
    actions: {
      placeContent: 'center'
    }
  })
);

export const OrganizationCard: React.FC<IOrganizationCardProps> = ({
  name,
  address,
  amountOfDrivers,
  amountOfPeople,
  organizationPhotoSrc,
  ...props
}) => {
  const classes = useStyles(props);
  return (
    <Card>
      <CardMedia
        component={'img'}
        image={
          (organizationPhotoSrc && organizationPhotoSrc) ||
          'https://cdn.steemitimages.com/DQmUcM45ZzL8A697W6v4LGph1RPerpDUnutJx73JXtz1nRc/neticon.jpg'
        }
        height={'200'}
        className={classes.media}
      />
      <CardContent>
        <Container>
          <Typography variant={'h5'}>
            <b>{name}</b>
          </Typography>
          <Typography>
            Участников: {amountOfPeople}, них них водителей {amountOfDrivers}
          </Typography>
          <Typography>Адрес: {address}</Typography>
        </Container>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button variant={'text'} color={'primary'}>
          Выйти из организации
        </Button>
      </CardActions>
    </Card>
  );
};
