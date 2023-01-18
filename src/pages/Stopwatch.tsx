import tw from 'tailwind-styled-components';
import { formatTime } from '../utils/stopwatch';

interface ITime {
  second: number;
  minute: number;
  hour: number;
}

interface StopwatchProps {
  props: {
    time: ITime;
    status: string;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
  };
}

const Stopwatch = (stopwatchProps: StopwatchProps) => {
  const { time, status, onStart, onPause, onReset } = stopwatchProps.props;

  return (
    <Wrapper>
      <div>
        <StopwatchView>{formatTime(time)}</StopwatchView>
        <BtnWrap>
          {status === 'play' ? (
            <button onClick={onPause}>정지</button>
          ) : (
            <button onClick={onStart}>시작</button>
          )}
          <button onClick={onReset}>초기화</button>
        </BtnWrap>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`
flex
justify-center
items-center
`;

const StopwatchView = tw.div`
flex
justify-center
text-8xl
`;

const BtnWrap = tw.div`
flex
justify-around
text-2xl
mt-10
`;
export default Stopwatch;
