import axios, { AxiosResponse } from 'axios';

export const updateFirebaseRegistrationToken = (token: string): Promise<AxiosResponse> => {
  return axios.post(
    '/api/user/updateFirebaseRegistrationToken',
    {
      token
    },
    {
      withCredentials: true
    }
  );
};
