import { useState, useRef, useEffect } from 'react';
import useTimerStore from '../../store/timer';

const TimerController = () => {
  const { time, setTime, setTimeClear } = useTimerStore();
  const playTimeout = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);
  const pauseTime = useRef<number | null>(null);
  const [status, setStatus] = useState<string>('stop');
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

    // clean-up 함수의 실행 순서는 "state 업데이트 -> 리렌더링 -> 클린업 -> 새로운 이펙트 실행" 이기 때문에 useEffect의 동작에는 문제 X
    return () => {
      if (playTimeout.current) clearInterval(playTimeout.current);
    };
  }, [playTimeout, setTime, time, status]);

  return {
    status,
    onStart,
    onPause,
  };
};

export default TimerController;
