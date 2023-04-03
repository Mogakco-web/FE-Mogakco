import api from './ApiController';

export const rankApis = {
  // 랭크 목록 불러오기
  getRank: async () => {
    const res = await api.get('/api/v1/ranking');
    return res;
  },
  resetRank: async () => {
    const res = await api.post('/api/v1/ranking');
    return res;
  },
};
