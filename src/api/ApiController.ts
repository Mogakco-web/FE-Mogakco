import axios, { AxiosRequestConfig } from 'axios';

//제너럴한 api 요청 인스턴스
const api = axios.create({ withCredentials: true });
//첫 로그인 시 authToken 발급용 인스턴스
const onceApi = axios.create({ withCredentials: true });
//401 토큰 재발급과 동시에 재요청용 인스턴스
const reApi = axios.create({ withCredentials: true });

api.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  //모든 요청 시 accessToken 인가 받기
  requestConfig.headers = { Authorization: `Bearer ${accessToken}` };

  //토큰 만료 시
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
    console.log('response error', error);
    return Promise.reject(error);
  },
);

//로그인 시 유저정보 get용 헤더
onceApi.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  requestConfig.headers = {
    Authorization: `Bearer ${accessToken}`,
    userInfo: `${accessToken} `,
  };
  return requestConfig;
});

//401 토큰 재발급과 동시에 재요청용 헤더
reApi.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  requestConfig.headers = { Authorization: `Bearer ${accessToken}` };
  return requestConfig;
});

//유저용 api 함수
export const userApis = {
  userInfo: async () => {
    const res = await onceApi.get(`/api/v1/member/userInfo/one`);
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

export default api;
