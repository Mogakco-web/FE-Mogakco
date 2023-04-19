import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import useStopwatchStore from '../../store/timer';
import { formatTime } from '../../utils/timer';

const TimeModal = () => {
  const { time } = useStopwatchStore();
  return (
    <Wrapper>
      <Link to='/timer'>
        <Wrapper>{formatTime(time)}</Wrapper>;
      </Link>
    </Wrapper>
  );
};

const Wrapper = tw.div`
bg-purple
right-0
bottom-0
fixed
w-fit
h-fit
p-2
m-5
text-lg
rounded-lg
cursor-pointer
`;

export default TimeModal;
