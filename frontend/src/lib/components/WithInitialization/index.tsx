import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import OrganizationsModel from '../../models/organizationsModel';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserModel from '../../models/userModel';
import TripModel from '../../models/tripModel';
import { IUser } from '../../domain/user';
import { ICar } from '../../domain/car';
import { IOrganization } from '../../domain/organization';
import { IResponseTrip } from '../../store/reducers/allTripsReducer';
import { setUserDataAction, setOrganizationsAction, setCarsAction, setMyTripsAction } from '../../store/actions';
import './WithInitialization.scss';

interface IWithInitializationProps {
  isSessionAuthorized: boolean;
  setRole: (role: string) => void;
  setUserData: (userData: IUser) => void;
  setOrganizations: (organizations: IOrganization) => void;
  setMyTrips: (trips: IResponseTrip) => void;
  canBeDriver: (canBe: boolean) => void;
  setCars: (cars: ICar[]) => void;
  children: React.ReactNode;
}

class WithInitialization extends PureComponent<IWithInitializationProps> {
  public async componentDidMount() {
    if (!this.props.isSessionAuthorized) {
      const organizations = await OrganizationsModel.getOrganizations();
      const userData = await UserModel.getUserData();
      const trips = await TripModel.getMyTrips();
      const isUserDriver = await UserModel.isUserDriver();
      await this.props.setUserData(userData);
      await this.props.setOrganizations(organizations);
      await this.props.setMyTrips(trips);
      console.log(isUserDriver);
      if (isUserDriver) {
        const cars = await UserModel.getUserCars();
        await this.props.setCars(cars);
      }
    }
  }

  public render() {
    return this.props.isSessionAuthorized ? (
      this.props.children
    ) : (
      <div style={{ transform: 'translate(50vw, 40vh)' }}>
        <CircularProgress />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSessionAuthorized: state.usr.isSessionAuthorized
});

const mapDispatchToProps = dispatch => {
  return {
    setCars: cars => dispatch(setCarsAction(cars)),
    setUserData: userData => dispatch(setUserDataAction(userData)),
    setOrganizations: organizations => dispatch(setOrganizationsAction(organizations)),
    setMyTrips: trips => dispatch(setMyTripsAction(trips))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithInitialization);
