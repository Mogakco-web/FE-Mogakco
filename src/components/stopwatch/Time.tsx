import useStopwatchStore from '../../store/stopwatchStore';
import tw from 'tailwind-styled-components';
import { formatTime } from '../../utils/stopwatch';

const Time = () => {
  const { time } = useStopwatchStore();
  return <Wrapper>{formatTime(time)}</Wrapper>;
};
const Wrapper = tw.div`
flex
justify-center
`;
export default Time;
