import useStopwatchStore from '../../store/timer';
import tw from 'tailwind-styled-components';
import { formatTime } from '../../utils/timer/index';

const TimeView = () => {
  const { time } = useStopwatchStore();
  return <Wrapper>{formatTime(time)}</Wrapper>;
};
const Wrapper = tw.div`
flex
justify-center
`;
export default TimeView;
