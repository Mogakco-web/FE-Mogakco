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
      <StopwatchWrapp>
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
      </StopwatchWrapp>
      <TimeRecord />
    </Wrapper>
  );
};

const Wrapper = tw.div`

`;

const StopwatchWrapp = tw.div`
flex
justify-center
items-center
flex-col
h-96
`;

const TimeWrap = tw.div`
text-8xl
`;

const BtnWrap = tw.div`
text-3xl
mt-10
`;

export default Stopwatch;
