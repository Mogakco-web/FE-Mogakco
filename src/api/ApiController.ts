import { userApis } from './user';
import axios, { AxiosRequestConfig } from 'axios';

//401 토큰 재발급과 동시에 재요청용 인스턴스
const reApi = axios.create({ withCredentials: true });
//401 토큰 재발급과 동시에 재요청용 헤더
reApi.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  requestConfig.headers = { Authorization: `Bearer ${accessToken}` };
  return requestConfig;
});

//제너럴한 api 요청 인스턴스
const api = axios.create({ withCredentials: true });

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

export default api;
