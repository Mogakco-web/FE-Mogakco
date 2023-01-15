import { useState, useRef } from 'react';
import useTimeStore from '../store/timeStore';

const useTimer = (init: number = 0) => {
  const { time, setTime, setTimeClear } = useTimeStore();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const countRef = useRef<undefined | ReturnType<typeof setInterval>>();

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTime(1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTime(1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimeClear();
  };

  return {
    time,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  };
};

export default useTimer;
