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
import { getCurrentDate, transHMC, getYesterDate } from '../utils/timer';
import TimerController from '../components/timer/TimerController';

interface TimerControllerInterface {
  status: string;
  onStart: () => void;
  onPause: () => void;
}

const Timer = () => {
  const { status, onStart, onPause }: TimerControllerInterface =
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
      const [hours, month, sce] = res.data.recodeTime.split(':').map(Number);
      setTime(hours, month, sce);
      // 오늘 타임 기록이 초기화된 0초면 기록된 시작 날짜 삭제
      // localStorage.removeItem('startDate');
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
      timerCreDay: getCurrentDate(),
    });
    // 어제 타임 기록과 비교 데이터 가져오기
    yestaerDayCompareRecordMutate({
      oauthId: userInfo.userOauthId,
      todayDateInfo: getCurrentDate(),
      yesterdayDateInfo: getYesterDate(),
    });
  }, []);

  const onPauseClick = () => {
    // 정지 클릭시
    onPause();
    // 정지 클릭시 현재 날짜 데이터 가져와서 시작 날짜와 비교
    const startDate = localStorage.getItem('startDate');
    const cureentDate = getCurrentDate();
    let sendDate = getCurrentDate();
    if (startDate) {
      // 타이머 시작을 전날에 한 경우 (자정이 넘어서도 지속된 타이머)
      if (startDate < cureentDate) {
        sendDate = startDate;
        // 자정이 넘었으니 startDate를 서버로 전송 후 로컬에서 삭제
        localStorage.removeItem('startDate');
      } else {
        // 자정이 넘지 않았으니 getCurrentDate()를 서버로 전송하면 된다.
        sendDate = cureentDate;
      }
    }
    const [hours, minute, second] = transHMC(time);
    recordMutate({
      hours,
      minute,
      second,
      timerCreDay: sendDate,
      oauthId: userInfo.userOauthId,
    });
  };

  const onStartClick = () => {
    onStart();
    // getCurrentDate() 로컬에 시작 데이터 저장
    localStorage.setItem('startDate', getCurrentDate());
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
            <TimeBtn className='mr-[30px]' onClick={() => onPause()}>
              일시정지
            </TimeBtn>
          ) : (
            <TimeBtn onClick={() => onStartClick()}>시작</TimeBtn>
          )}
          <TimeBtn onClick={() => onPauseClick()}>공부 끝</TimeBtn>
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
p-2
w-[250px]
flex
justify-between
`;

const TimeBtn = tw.button`
bg-red
`;

export default Timer;
