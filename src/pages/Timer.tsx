import { useEffect } from 'react';
import { useMutation } from 'react-query';
import tw from 'tailwind-styled-components';
import { timerApis } from '../api/timer';
import TimeView from '../components/timer/TimeView';
import TimeRecord from '../components/timer/TimeRecord';
import useTimerStore from '../store/timer';
import userStore from '../store/userStore';
import {
  getCurrentDate,
  transHMC,
  getYesterDate,
  ContinuousMode,
} from '../utils/timer';
import useRecord from '../hooks/timer/useRecord';
import Lottie from 'lottie-react';
import catTime from '../lottie/catTime.json';

interface TimerControllerInterface {
  props: {
    status: string;
    onStart: () => void;
    onPause: () => void;
  };
}

const Timer = (TimerControll: TimerControllerInterface) => {
  const { status, onStart, onPause } = TimerControll.props;
  const { userInfo } = userStore();
  const { time, setTime } = useTimerStore();
  // 타임 정지시 기록하기
  const { mutate: recordMutate } = useRecord();

  // 오늘의 타임 기록 가져오기
  const { mutate: todayRecordInfoMutate } = useMutation(
    timerApis.getTodayRecordInfo,
    {
      onSuccess: (res) => {
        // 오늘의 타임 기록 가져와서 setTime에 넣는다.
        if (res.data !== '해당날짜 공부 기록없음') {
          const [hours, month, sce] = res.data.recodeTime
            ?.split(':')
            .map(Number);
          setTime(hours, month, sce);
        } else {
          // 오늘 타임 기록이 초기화된 0초면 기록된 시작 날짜 삭제
          setTime(0, 0, 0);
          localStorage.removeItem('startDate');
        }
      },
      // onError: (error) => console.log(error),
    },
  );

  // 어제 타임 기록과 비교 데이터 가져오기
  const {
    data: yestaerDayCompareRecordData,
    mutate: yestaerDayCompareRecordMutate,
    isLoading: yesterLoading,
  } = useMutation(timerApis.getYesterDayCompareRecord, {
    onSuccess: (res) => {
      // console.log(res);
    },
    // onError: (error) => alert('오류 발생.'),
  });

  // 일주일치 기록 데이터 가져오기
  const {
    data: weekCompareRecordData,
    mutate: weekCompareRecordMutate,
    isLoading: weekLoading,
  } = useMutation(timerApis.getWeekCompareRecord, {
    onSuccess: (res) => {
      console.log(res);
    },
    // onError: (error) => alert('오류 발생.'),
  });

  useEffect(() => {
    if (status !== 'play') {
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
      // 일주일치 기록 데이터 가져오기
      weekCompareRecordMutate({
        oauthId: userInfo.userOauthId,
      });
    }
  }, []);

  const onPauseClick = () => {
    // TODO 공부 끝 눌렀는데, 상태 업데이트 관련 (자정 넘어갔을때 0으로 초기화 될 때 편의 고려해야함)
    // 일시정지 클릭시
    onPause();
    // 정지 클릭시 현재 날짜 데이터 가져와서 시작 날짜와 비교
    const sendDate = ContinuousMode();
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
    localStorage.setItem('startDate', getCurrentDate());
  };

  return (
    <Wrapper>
      <StopwatchWrap>
        <TimeWrap>
          <Lottie
            style={{
              position: 'absolute',
              width: '280px',
              right: '-22px',
              top: '-133px',
            }}
            animationData={catTime}
          />
          <TimeView />
          <BtnWrap>
            {status === 'play' ? (
              <TimeBtn onClick={() => onPauseClick()}>정지</TimeBtn>
            ) : (
              <TimeBtn onClick={() => onStartClick()}>시작</TimeBtn>
            )}
          </BtnWrap>
        </TimeWrap>
      </StopwatchWrap>
      <TimeRecord
        weekCompareRecordData={weekCompareRecordData?.data}
        yestaerDayCompareRecordData={yestaerDayCompareRecordData?.data}
      />
    </Wrapper>
  );
};

const Wrapper = tw.div`
flex
flex-col
justify-center
items-center
w-full
h-[85vh]
`;

const StopwatchWrap = tw.div`
mb-[30px]
`;

const TimeWrap = tw.div`
bg-[#f8f7fd]
w-[1000px]
h-[450px]
rounded-lg
flex
flex-col
items-center
justify-center
relative
`;

const BtnWrap = tw.div`
mt-[50px]
text-[28px]
flex
justify-center
w-[80%]
font-semibold
`;

const TimeBtn = tw.button`
bg-dullPurple
rounded-lg
px-[35px]
py-[7px]
text-white
`;

export default Timer;
