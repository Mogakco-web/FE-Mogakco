import { useState, useRef, useEffect } from 'react';
import useRecord from '../../hooks/timer/useRecord';
import useTimerStore from '../../store/timer';
import userStore from '../../store/userStore';
import { ContinuousMode, transHMC } from '../../utils/timer';

const TimerController = () => {
  const { time, setTime, setTimeClear } = useTimerStore();
  const playTimeout = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);
  const pauseTime = useRef<number | null>(null);
  const [status, setStatus] = useState<string>('stop');
  const { userInfo } = userStore();
  const { mutate: recordMutate } = useRecord();
  const { hour, minute, second } = time;
  // 밀리초로 변환
  const totalMilliseconds = ((hour * 60 + minute) * 60 + second) * 1000;

  const onStart = () => {
    // 최초 시작
    if (status === 'stop') {
      const now = new Date();
      // 시간 데이터가 있을 시 그 시간으로 초기화
      if (totalMilliseconds) {
        startTime.current = now.getTime() - totalMilliseconds;
      } else {
        // 없을 시 0초부터 시작하게 함
        startTime.current = Date.now();
      }
    }
    // pause후 시작
    else if (status === 'pause') {
      if (startTime.current && pauseTime.current)
        startTime.current += Date.now() - pauseTime.current;
    }
    setStatus('play');
  };

  const onPause = () => {
    if (status === 'play') {
      if (playTimeout.current) clearInterval(playTimeout.current);
      pauseTime.current = Date.now();
    }
    setStatus('pause');
  };

  useEffect(() => {
    // play 눌렀을 때의 로직
    if (startTime.current === null) {
      const now = new Date();
      if (totalMilliseconds) {
        startTime.current = now.getTime() - totalMilliseconds;
      } else {
        startTime.current = Date.now();
      }
    }
    if (status === 'play') {
      playTimeout.current = setTimeout(() => {
        const now = new Date();
        const elapsedTime = now.getTime() - startTime.current!;
        const elapsedSeconds = Math.floor(elapsedTime / 1000);
        const newHour = Math.floor(elapsedSeconds / 3600);
        const newMinute = Math.floor((elapsedSeconds % 3600) / 60);
        const newSecond = elapsedSeconds % 60;
        setTime(newHour, newMinute, newSecond);
      }, 1000);
    }
    // 페이지를 나갈 때 타이머 데이터 저장
    window.addEventListener('beforeunload', handleBeforeUnload);
    // clean-up 함수의 실행 순서는 "state 업데이트 -> 리렌더링 -> 클린업 -> 새로운 이펙트 실행" 이기 때문에 useEffect의 동작에는 문제 X
    return () => {
      if (playTimeout.current) clearInterval(playTimeout.current);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [playTimeout, setTime, time, status]);

  // 페이지를 나갈 때 타이머 데이터 저장 함수
  const handleBeforeUnload = (event: any) => {
    event.preventDefault();
    event.returnValue = '';
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
    onStart();
  };

  return {
    status,
    onStart,
    onPause,
  };
};

export default TimerController;
