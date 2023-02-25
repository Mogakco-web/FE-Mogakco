import axios, { AxiosRequestConfig } from 'axios';

// const api = axios.create({
//   baseURL: 'http://3.38.8.89:8080',
//   withCredentials: true,
// });

axios.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const authToken: string | null = localStorage.getItem('authToken');
  if (authToken === 'null' || authToken === null) {
    console.log(authToken);
    requestConfig.headers = {
      Authorization: `Bearer ${accessToken}`,
      userInfo: `${accessToken} `,
    };
  } else {
    console.log('&', authToken);
    requestConfig.headers = { Authorization: `Bearer ${accessToken}` };
  }
  return requestConfig;
});

export const userApis = {
  userInfo: async () => {
    const res = await axios.get(`/api/v1/member/userInfo/one`);
    return res;
  },
  logOut: async (data: string | null) => {
    const res = await axios.delete(
      `/api/v1/eliminate/authToken?authToken=${data}`,
    );
    return res;
  },
};
