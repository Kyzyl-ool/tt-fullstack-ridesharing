import axios from 'axios';

export class OrganizationModel {
  static async put({ name, controlQuestion, controlAnswer, latitude, longitude }) {
    return await axios.put(
      `/api/organization`,
      {
        name,
        latitude,
        longitude,
        controlQuestion,
        controlAnswer
      },
      {
        withCredentials: true
      }
    );
  }

  static async participants(organizationId: string) {
    return await axios.get(`/api/organization/participants?organizationId=${organizationId}`, {
      withCredentials: true
    });
  }

  static async get(organizationId: string) {
    return await axios.get(`/api/organization?organizationId=${organizationId}`, {
      withCredentials: true
    });
  }

  static async post({ organizationId, name }) {
    return await axios.post(
      `/api/organization`,
      {
        organizationId,
        name
      },
      {
        withCredentials: true
      }
    );
  }

  static async delete(organizationId: string) {
    return await axios.delete(`/api/organization/${organizationId}`, {
      withCredentials: true
    });
  }
}
