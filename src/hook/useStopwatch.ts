import { useState, useRef, useEffect } from 'react';
import useStopwatchStore from '../store/stopwatchStore';

const useStopwatch = () => {
  const { time, setTime, setTimeClear } = useStopwatchStore();
  const playTimeout = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);
  const pauseTime = useRef<number | null>(null);
  const [status, setStatus] = useState<string>('stop');
  const onStart = () => {
    // 최초 시작
    if (status === 'stop') startTime.current = Date.now();
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

  const onReset = () => {
    setStatus('stop');
    if (playTimeout.current) clearInterval(playTimeout.current);
    setTimeClear();
    startTime.current = null;
    pauseTime.current = null;
  };
  useEffect(() => {
    // play 눌렀을 때의 로직
    if (!startTime.current) startTime.current = Date.now();
    if (status === 'play') {
      const now = new Date(Date.now() - startTime.current);
      playTimeout.current = setTimeout(() => {
        setTime(now.getUTCSeconds(), now.getUTCMinutes(), now.getUTCHours());
      }, 1);
    }
    // clean-up 함수의 실행 순서는 "state 업데이트 -> 리렌더링 -> 클린업 -> 새로운 이펙트 실행" 이기 때문에 useEffect의 동작에는 문제 X
    return () => {
      if (playTimeout.current) clearTimeout(playTimeout.current);
    };
  }, [playTimeout, setTime, time, status]);

  return {
    status,
    onStart,
    onPause,
    onReset,
  };
};

export default useStopwatch;
