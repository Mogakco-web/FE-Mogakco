import api from './ApiController';
import onceApi from './ApiController';

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
