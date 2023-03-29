import tw from 'tailwind-styled-components';
import userStore from '../../store/userStore';

interface Props {
  yestaerDayCompareRecordData: string;
  weekCompareRecordData: [
    {
      day_of_totalTime: number;
      member_Seq: number;
      recodeTime: string;
      timerCreDay: string;
      timer_seq: number;
    },
  ];
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
        {weekCompareRecordData?.map((data, index) => (
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
