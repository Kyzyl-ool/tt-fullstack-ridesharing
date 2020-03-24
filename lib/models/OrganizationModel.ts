import axios from 'axios';
import UserModel from 'models/UserModel';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

interface Organization {
  id: number;
  firstName: string;
  lastName: string;
  avatarSrc: string;
  rating: number;
}

class OrganizationModel implements Organization {
  avatarSrc: string;
  firstName: string;
  id: number;
  lastName: string;
  rating: number;

  constructor() {}
}
