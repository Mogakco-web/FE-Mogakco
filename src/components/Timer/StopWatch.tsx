import useTimer from '../../hook/useTimer';
import { formatTime } from '../../utils';
const StopWatch = () => {
  const {
    time,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useTimer(0);
  return (
    <div>
      <h3>타이머</h3>
      <div>
        <p>{formatTime(time)}</p>
        <div>
          {!isActive && !isPaused ? (
            <button onClick={handleStart}>시작</button>
          ) : isPaused ? (
            <button onClick={handlePause}>정지</button>
          ) : (
            <button onClick={handleResume}>재시작</button>
          )}
          <button onClick={handleReset} disabled={!isActive}>
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
