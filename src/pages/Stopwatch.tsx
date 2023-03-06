import tw from 'tailwind-styled-components';
import Time from '../components/stopwatch/Time';
import TimeRecord from '../components/stopwatch/TimeRecord';

interface StopwatchProps {
  props: {
    status: string;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
  };
}

const Stopwatch = (stopwatchProps: StopwatchProps) => {
  const { status, onStart, onPause, onReset } = stopwatchProps.props;

  return (
    <Wrapper>
      <StopwatchWrap>
        <TimeWrap>
          <Time />
        </TimeWrap>
        <BtnWrap>
          {status === 'play' ? (
            <button onClick={onPause}>정지</button>
          ) : (
            <button onClick={onStart}>시작</button>
          )}
          {/* <button onClick={onReset}>초기화</button> */}
        </BtnWrap>
      </StopwatchWrap>
      <TimeRecord />
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

export default Stopwatch;
