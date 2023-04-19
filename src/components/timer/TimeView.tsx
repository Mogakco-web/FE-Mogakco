import useStopwatchStore from '../../store/timer';
import tw from 'tailwind-styled-components';
import { formatTime } from '../../utils/timer/index';

const TimeView = () => {
  const { time } = useStopwatchStore();
  const [hours, minutes, seconds] = formatTime(time)
    .split(':')
    .map((val) => val.trim());
  return (
    <Wrapper>
      <BlocTime>
        <FigureWrap>
          <Figure>
            <CountTitle>Hours</CountTitle>
            <TimeText>{hours}</TimeText>
          </Figure>
        </FigureWrap>
      </BlocTime>
      <BlocTime>
        <FigureWrap>
          <Colons>:</Colons>
          <Figure>
            <CountTitle>Minutes</CountTitle>
            <TimeText>{minutes}</TimeText>
          </Figure>
        </FigureWrap>
      </BlocTime>
      <BlocTime>
        <FigureWrap>
          <Colons>:</Colons>
          <Figure>
            <CountTitle>Seconds</CountTitle>
            <TimeText>{seconds}</TimeText>
          </Figure>
        </FigureWrap>
      </BlocTime>
    </Wrapper>
  );
};
const Wrapper = tw.div`
flex
mb-[30px]
pt-[50px]
`;

const BlocTime = tw.div`
relative
`;

const CountTitle = tw.span`
mb-[15px]
text-2xl
text-[#57606f]
absolute
top-[-50px]
`;

const Colons = tw.span`
text-[50px]
text-[#57606f]
font-semibold
mx-[15px]
`;

const Figure = tw.div`
flex
items-center
justify-center
h-[160px]
w-[150px]
bg-white
rounded-[8px]
shadow-md
`;

const FigureWrap = tw.div`
flex
items-center
justify-center
`;
const TimeText = tw.span`
font-semibold
text-[#57606f]
text-[70px]
`;
export default TimeView;
