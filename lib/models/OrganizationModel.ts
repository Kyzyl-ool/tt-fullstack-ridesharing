import axios from 'axios';

interface IOrganizationSearchResponse {
  address: string;
  id: number;
  name: string;
}

type ISearchOrganizationsResponseBody = Array<IOrganizationSearchResponse>;

export interface IGetQuestionsResponseBody {
  controlQuestion: string;
  id: number;
}

interface IJoinOrganizationRequestBody {
  id: number;
  controlAnswer: string;
}

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
    return (
      await axios.delete(`/api/organization/${organizationId}`, {
        withCredentials: true
      })
    ).data;
  }

  static async search(findString: string): Promise<ISearchOrganizationsResponseBody> {
    return (
      await axios.get('/api/organization/search', {
        params: {
          query: findString
        }
      })
    ).data;
  }

  static async getQuestions(organizationId: number): Promise<IGetQuestionsResponseBody> {
    const res = await axios.get('/api/organization/question', {
      params: {
        id: organizationId
      }
    });
    return res.data;
  }

  static async join(requestBody: IJoinOrganizationRequestBody) {
    const res = await axios.post('/api/organization/join', requestBody);
    return res.data;
  }
}
