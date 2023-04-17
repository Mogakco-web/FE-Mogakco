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
      {yestaerDayCompareRecordData && (
        <Record>{yestaerDayCompareRecordData}</Record>
      )}

      <>
        {weekCompareRecordData?.map((data, index) => (
          <Record key={index}>{data.recodeTime}</Record>
        ))}
      </>
    </Wrapper>
  );
};

const Wrapper = tw.div`
text-center
flex
justify-between
w-[1000px]
`;
const Record = tw.div`
px-[20px]
py-[10px]
mr-[10px]
last:mr-0
text-[#57606f]
text-[24px]
bg-[#f8f7fd]
rounded-lg
font-semibold
`;
export default TimeRecord;
