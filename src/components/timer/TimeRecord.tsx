import tw from 'tailwind-styled-components';
import userStore from '../../store/userStore';

interface WeekCompareRecordData {
  day_of_totalTime: number;
  member_Seq: number;
  recodeTime: string;
  timerCreDay: string;
  timer_seq: number;
}

interface Props {
  yestaerDayCompareRecordData: string;
  weekCompareRecordData: string | WeekCompareRecordData[];
}

const TimeRecord = ({
  yestaerDayCompareRecordData,
  weekCompareRecordData,
}: Props) => {
  const { userInfo } = userStore();
  return (
    <Wrapper>
      <Record>{yestaerDayCompareRecordData}</Record>
      <>
        {Array.isArray(weekCompareRecordData) &&
          weekCompareRecordData.map((data, index) => (
            <Record key={index}>{data.recodeTime}</Record>
          ))}
      </>
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
