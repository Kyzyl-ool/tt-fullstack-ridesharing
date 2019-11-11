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
import { canBeDriverAction } from '../../store/actions/userActions';

interface IMainPageProps {
  setRole: (role: string) => void;
  setUserData: (userData: IUser) => void;
  setOrganizations: (organizations: IOrganization) => void;
  setMyTrips: (trips: IResponseTrip) => void;
  canBeDriver: (canBe: boolean) => void;
  setCars: (cars: ICar[]) => void;
  isUserDriver: boolean;
}

class MainPage extends PureComponent<IMainPageProps> {
  public async componentDidMount() {
    const organizations = await OrganizationsModel.getOrganizations();
    const userData = await UserModel.getUserData();
    const trips = await tripModel.getMyTrips();
    const isUserDriver = await UserModel.isUserDriver();
    this.props.setUserData(userData);
    this.props.setOrganizations(organizations);
    this.props.setMyTrips(trips);
    this.props.canBeDriver(isUserDriver);
    console.log(isUserDriver);
    if (isUserDriver) {
      const cars = await UserModel.getUserCars();
      this.props.setCars(cars);
    }
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
          {this.props.isUserDriver && (
            <Button onClick={this.onDriverButtonClick} size="large">
              <Link style={{ textDecoration: 'none' }} to="/new_trip">
                <div className="main-page__button">Водитель</div>
              </Link>
            </Button>
          )}
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

const mapStateToProps = state => ({
  isUserDriver: state.usr.isDriver
});

const mapDispatchToProps = dispatch => {
  return {
    setRole: role => dispatch(setRoleAction(role)),
    setCars: cars => dispatch(setCarsAction(cars)),
    setUserData: userData => dispatch(setUserDataAction(userData)),
    setOrganizations: organizations => dispatch(setOrganizationsAction(organizations)),
    setMyTrips: trips => dispatch(setMyTripsAction(trips)),
    canBeDriver: canBe => dispatch(canBeDriverAction(canBe))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
