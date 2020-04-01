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

  static async members(organizationId: string) {
    return await axios.get(`/api/organization/members`, {
      withCredentials: true,
      params: {
        id: organizationId
      }
    });
  }

  static async get(organizationId: string) {
    return await axios.get(`/api/organization?id=${organizationId}`, {
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
