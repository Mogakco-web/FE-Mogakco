import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Time from './TimeView';

const TimeModal = () => {
  return (
    <Wrapper>
      <Link to='/timer'>
        <Time />
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
