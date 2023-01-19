import tw from 'tailwind-styled-components';
import Time from '../components/stopwatch/Time';

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
      <div>
        <TimeWrap>
          <Time />
        </TimeWrap>

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

const TimeWrap = tw.div`
text-8xl
`;

const BtnWrap = tw.div`
flex
justify-around
text-2xl
mt-10
`;

export default Stopwatch;
