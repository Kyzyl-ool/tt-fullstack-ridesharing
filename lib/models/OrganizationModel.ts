import axios from 'axios';
import UserModel from 'models/UserModel';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

interface Organization {
  id: number;
  firstName: string;
  lastName: string;
  avatarSrc: string;
  rating: number;
  name: string;
}

interface OrganizationWithNullable {
  id?: number;
  firstName?: string;
  lastName?: string;
  avatarSrc?: string;
  rating?: number;
  name?: string;
}

class OrganizationModel implements Organization {
  avatarSrc: string;
  firstName: string;
  id: number;
  lastName: string;
  rating: number;
  name: string;

  init(data: OrganizationWithNullable) {
    this.id = data.id;
    this.avatarSrc = data.avatarSrc;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.rating = data.rating;
  }

  async post() {
    axios.post(`${BACKEND_STAGING_URL}/organization`, {
      name: this.name,
      latitude: -10.0,
      longitude: 10.0,
      controlQuestion: 'Whatsapp?',
      controlAnswer: 'Gut'
    });
  }
}
