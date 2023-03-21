import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({ withCredentials: true });

//재발급과 동시에 이전 막힌 요청용 인스턴스
const reApi = axios.create({ withCredentials: true });

export const userApis = {
  userInfo: async () => {
    const res = await api.get(`/api/v1/member/userInfo/one`);
    return res;
  },
  logOut: async (data: string | null) => {
    const res = await api.delete(
      `/api/v1/eliminate/authToken?authToken=${data}`,
    );
    return res;
  },
  tokenRefresh: async () => {
    const res = await api.get('/api/v1/member/userInfo/access');
    return res;
  },
  healthCheck: async () => {
    const res = await api.post('/api/v1/healthcheck');
    return res;
  },
};
api.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authToken: string | null = localStorage.getItem('authToken');
  //최초 로그인 시 authToken은 없다.
  //로그인 후 유저정보 받아올 때 가져오므로 null 확인 -> 유저정보 받아올 때는 유일하게 헤더에 요청 값 달라지므로 분기
  if (authToken === 'null' || authToken === null) {
    console.log(
      `authToken이 null인가? ${authToken === 'null' || authToken === null}`,
    );
    requestConfig.headers = {
      Authorization: `Bearer ${accessToken}`,
      userInfo: `${accessToken} `,
    };
  } else {
    //모든 요청 시 accessToken 인가 받기
    requestConfig.headers = { Authorization: `Bearer ${accessToken}` };
  }
  if (accessToken === 'expired') {
    requestConfig.headers = { Authorization_refresh: `Bearer ${refreshToken}` };
  }

  return requestConfig;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    try {
      if (status === 401) {
        localStorage.setItem('accessToken', 'expired');
        const originalRequest = config;
        //token refresh 요청
        await userApis.tokenRefresh().then((res) => {
          const { authorization, authorization_refresh } = res.headers;
          localStorage.setItem('accessToken', authorization!);
          localStorage.setItem('refreshToken', authorization_refresh!);
        });
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return await reApi({
          ...originalRequest,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
    // Do something with response error
    console.log('response error', error);
    return Promise.reject(error);
  },
);

reApi.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  requestConfig.headers = { Authorization: `Bearer ${accessToken}` };
  return requestConfig;
});

export default api;
