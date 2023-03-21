import tw from 'tailwind-styled-components';
import userStore from '../../store/userStore';
import { transDate, transYesterDate } from '../../utils/timer';

interface IProps {
  yestaerDayCompareRecordData: string | undefined;
}

const TimeRecord = ({ yestaerDayCompareRecordData }: IProps) => {
  const { userInfo } = userStore();

  return (
    <Wrapper>
      <Record>{yestaerDayCompareRecordData}</Record>
    </Wrapper>
  );
};

const Wrapper = tw.div`
bg-white
w-[19%]
text-center
h-[45vh]
`;
const Record = tw.div`
text-xl
`;
export default TimeRecord;
