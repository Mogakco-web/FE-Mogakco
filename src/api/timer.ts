import api from './ApiController';
export interface RecordBody {
  hours?: string;
  minute?: string;
  second?: string;
  timerCreDay?: string;
  oauthId: string;
  yesterdayDateInfo?: string;
  todayDateInfo?: string;
}
export const timerApis = {
  // 타임 정지시 기록하기
  getRecord: async (body: RecordBody) => {
    const res = await api.post('/api/v1/timer/recode', { ...body });
    return res;
  },

  // 오늘의 타임 기록 가져오기
  getTodayRecordInfo: async (body: RecordBody) => {
    const res = await api.post('/api/v1/timer/todayInfo', { ...body });
    return res;
  },

  // 이전날과의 시간 비교
  getYesterDayCompareRecord: async (body: RecordBody) => {
    const res = await api.post('/api/v1/timer/compareYes', { ...body });
    return res;
  },
};
