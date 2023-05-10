import axios, { AxiosRequestConfig } from 'axios';
import api from './ApiController';

//첫 로그인 시 authToken 발급용 인스턴스
const onceApi = axios.create({ withCredentials: true });

//로그인 시 유저정보 get용 헤더
onceApi.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  requestConfig.headers = {
    Authorization: `Bearer ${accessToken}`,
    userInfo: `${accessToken} `,
    //ngrok get 오류
    'ngrok-skip-browser-warning': '69420',
  };
  return requestConfig;
});

export const userApis = {
  //최초 유저 정보 조회(authToken get)
  userInfo: async () => {
    const res = await onceApi.get(`/api/v1/member/userInfo/one`);
    return res;
  },
  //로그아웃
  logOut: async (data: string | null) => {
    const res = await api.delete(
      `/api/v1/eliminate/authToken?authToken=${data}`,
    );
    return res;
  },
  //토큰 리프레쉬(새 토큰 발급)
  tokenRefresh: async () => {
    const res = await api.get('/api/v1/member/userInfo/access');
    return res;
  },
  //api 헬스체크
  healthCheck: async () => {
    const res = await api.post('/api/v1/healthcheck');
    return res;
  },
};
