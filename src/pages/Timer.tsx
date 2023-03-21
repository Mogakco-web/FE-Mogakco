import { useEffect } from 'react';
import { useMutation } from 'react-query';
import tw from 'tailwind-styled-components';
import {
  getRecord,
  getTodayRecordInfo,
  getYesterDayCompareRecord,
} from '../api/timer';
import Time from '../components/timer/TimeView';
import TimeRecord from '../components/timer/TimeRecord';
import useTimerStore from '../store/timer';
import userStore from '../store/userStore';
import { transDate, transHMC, transYesterDate } from '../utils/timer';
import TimerController from '../components/timer/TimerController';

interface TimerControllerInterface {
  status: string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const Timer = () => {
  const { status, onStart, onPause, onReset }: TimerControllerInterface =
    TimerController();
  const { userInfo } = userStore();
  const { time, setTime } = useTimerStore();

  // 타임 정지시 기록하기
  const { mutate: recordMutate } = useMutation(getRecord, {
    onSuccess: (res) => {
      // console.log(res);
    },
    onError: (error) => alert('오류 발생.'),
  });

  // 오늘의 타임 기록 가져오기
  const { mutate: todayRecordInfoMutate } = useMutation(getTodayRecordInfo, {
    onSuccess: (res) => {
      // 오늘의 타임 기록 가져와서 setTime에 넣는다.
      const [hours, month, sce] = res.data.split(':').map(Number);
      setTime(hours, month, sce);
    },
    // onError: (error) => console.log(error),
  });

  // 어제 타임 기록과 비교 데이터 가져오기
  const {
    data: yestaerDayCompareRecordData,
    mutate: yestaerDayCompareRecordMutate,
  } = useMutation(getYesterDayCompareRecord, {
    onSuccess: (res) => {
      console.log(res);
    },
    // onError: (error) => alert('오류 발생.'),
  });

  useEffect(() => {
    // 오픈시 오늘 타임 기록 가져오기
    todayRecordInfoMutate({
      oauthId: userInfo.userOauthId,
      timerCreDay: transDate(),
    });

    // 어제 타임 기록과 비교 데이터 가져오기
    yestaerDayCompareRecordMutate({
      oauthId: userInfo.userOauthId,
      todayDateInfo: transDate(),
      yesterdayDateInfo: transYesterDate(),
    });
  }, []);

  const onPauseClick = () => {
    // 정지 클릭시
    onPause();
    const [hours, minute, second] = transHMC(time);
    recordMutate({
      hours,
      minute,
      second,
      timerCreDay: transDate(),
      oauthId: userInfo.userOauthId,
    });
  };

  const onStartClick = () => {
    onStart();
    // 시작 클릭시 실행하는 API... 예정
  };

  return (
    <Wrapper>
      <StopwatchWrap>
        <TimeWrap>
          <Time />
        </TimeWrap>
        <BtnWrap>
          {status === 'play' ? (
            <button onClick={() => onPauseClick()}>정지</button>
          ) : (
            <button onClick={() => onStartClick()}>시작</button>
          )}
          {/* <button onClick={onReset}>초기화</button> */}
        </BtnWrap>
      </StopwatchWrap>
      <TimeRecord
        yestaerDayCompareRecordData={yestaerDayCompareRecordData?.data}
      />
    </Wrapper>
  );
};

const Wrapper = tw.div`
flex
justify-between
items-center
bg-sky
p-[10px]
`;

const StopwatchWrap = tw.div`
flex
flex-col
justify-center
items-center
p-[30px]
bg-white
w-[80%]
h-[45vh]
`;

const TimeWrap = tw.div`
text-8xl
`;

const BtnWrap = tw.div`
text-3xl
mt-20
bg-red
p-2
`;

export default Timer;
