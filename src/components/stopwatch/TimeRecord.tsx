import axios from 'axios';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import userStore from '../../store/userStore';
import { transDate, transYesterDate } from '../../utils/stopwatch';

const TimeRecord = () => {
  const { userInfo } = userStore();
  const [myRecord, setMyRecord] = useState();

  useEffect(() => {
    const record = axios
      .post('api/v1/timer/todayInfo', {
        oauthId: userInfo.userOauthId,
        localDate: transDate(),
      })
      .then((res) => setMyRecord(res.data));
    const data = axios
      .post('api/v1/timer/compareYes', {
        oauthId: userInfo.userOauthId,
        todayDateInfo: transDate(),
        yesterdayDateInfo: transYesterDate(),
      })
      .then((res) => console.log(res.data));
  }, []);

  return (
    <Wrapper>
      <Record>현재 총 시간 {myRecord}</Record>
    </Wrapper>
  );
};
const Wrapper = tw.div`
bg-white
w-[19%]
text-center
h-[45vh]
`;
const Record = tw.div`
text-xl
`;
export default TimeRecord;
