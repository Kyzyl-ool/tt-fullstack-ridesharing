import axios, { AxiosResponse } from 'axios';

export const updateFirebaseRegistrationToken = (token: string): Promise<AxiosResponse> => {
  return axios.post(
    '/api/updateFirebaseRegistrationToken',
    {
      token
    },
    {
      withCredentials: true
    }
  );
};
