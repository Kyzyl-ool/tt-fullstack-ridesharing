import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { setRoleAction, setUserDataAction, setOrganizationsAction } from '../../store/actions';
import UserModel from '../../models/userModel';
import OrganizationsModel from '../../models/organizationsModel';
import { IUser } from '../../domain/user';
import { ICar } from '../../domain/car';
import { IOrganization } from '../../domain/organization';
import './MainPage.scss';
import { setMyTripsAction } from '../../store/actions/tripActions';
import { IResponseTrip } from '../../store/reducers/allTripsReducer';
import tripModel from '../../models/tripModel';
import { setCarsAction } from '../../store/actions/carActions';

interface IMainPageProps {
  setRole: (role: string) => void;
  setUserData: (userData: IUser) => void;
  setOrganizations: (organizations: IOrganization) => void;
  setMyTrips: (trips: IResponseTrip) => void;
  setCars: (cars: ICar[]) => void;
}

class MainPage extends PureComponent<IMainPageProps> {
  public async componentDidMount() {
    const organizations = await OrganizationsModel.getOrganizations();
    const userData = await UserModel.getUserData();
    const trips = await tripModel.getMyTrips();
    const cars = await UserModel.getUserCars();
    this.props.setCars(cars);
    this.props.setUserData(userData);
    this.props.setOrganizations(organizations);
    this.props.setMyTrips(trips);
    // this.props.setUserCars(cars);
  }
  public onDriverButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.setRole('DRIVER');
  };
  public onPassengerButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.setRole('PASSENGER');
  };

  render() {
    return (
      <div className="main-page__container">
        <div className="main-page__button-container">
          <Button onClick={this.onDriverButtonClick} size="large">
            <Link style={{ textDecoration: 'none' }} to="/new_trip">
              <div className="main-page__button">Водитель</div>
            </Link>
          </Button>
          <Button onClick={this.onPassengerButtonClick} size="large">
            <Link style={{ textDecoration: 'none' }} to="/search_trip">
              <div className="main-page__button">Пассажир</div>
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//
// })

const mapDispatchToProps = dispatch => {
  return {
    setRole: role => dispatch(setRoleAction(role)),
    setCars: cars => dispatch(setCarsAction(cars)),
    setUserData: userData => dispatch(setUserDataAction(userData)),
    setOrganizations: organizations => dispatch(setOrganizationsAction(organizations)),
    setMyTrips: trips => dispatch(setMyTripsAction(trips))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MainPage);
