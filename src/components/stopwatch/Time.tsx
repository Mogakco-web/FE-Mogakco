import useStopwatchStore from '../../store/stopwatch';
import tw from 'tailwind-styled-components';
import { formatTime } from '../../utils/stopwatch/index';

const Time = () => {
  const { time } = useStopwatchStore();
  return <Wrapper>{formatTime(time)}</Wrapper>;
};
const Wrapper = tw.div`
flex
justify-center
`;
export default Time;
