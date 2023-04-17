import tw from 'tailwind-styled-components';
import Lottie from 'lottie-react';
import catWithLaptop from '../../lottie/catRank.json';

interface IProps {
  rankingData: [
    {
      rank: number;
      score: number;
      userNickname: string;
      rankingMember: {
        member_imgUrl: string;
        nickname: string;
        member_seq: string;
      };
    },
  ];
}

const RankListView = ({ rankingData }: IProps) => {
  return (
    <Wrapper>
      <Lottie animationData={catWithLaptop} />
      <RankWrap>
        <RankHeader>
          <div className='w-[10%] ml-[30px]'>
            <span className='text-white font-semibold text-[20px]'>랭킹</span>
          </div>
          <div className='w-[40%]'>
            <span className='text-white font-semibold text-[20px]'>사용자</span>
          </div>
          <div className='w-[30%]'>
            <span className='text-white font-semibold text-[20px]'>칭호</span>
          </div>
          <div className='w-[30%]'>
            <span className='text-white font-semibold text-[20px]'>
              개발 시간
            </span>
          </div>
        </RankHeader>
        {rankingData?.map((rankInfo, index) => (
          <RankBody key={index}>
            <div className='w-[10%] ml-[30px]'>
              <span className='text-[#57606f] font-semibold text-[22px]'>
                {rankInfo.rank}등
              </span>
            </div>
            <div className='w-[40%] flex items-center'>
              <img
                className='object-cover w-[60px] h-[60px] rounded-full mr-[20px]'
                src={rankInfo.rankingMember.member_imgUrl}
                alt='Userprofile'
              />
              <span className='text-[#57606f] font-semibold text-[22px]'>
                {rankInfo.rankingMember.nickname}
              </span>
            </div>
            <div className='w-[30%]'>
              <span className='text-[#57606f] font-semibold text-[22px]'>
                시간을 지배하는자
              </span>
            </div>
            <div className='w-[30%]'>
              <span className='text-[#57606f] font-semibold text-[22px]'>
                {rankInfo.score}
              </span>
            </div>
          </RankBody>
        ))}
      </RankWrap>
    </Wrapper>
  );
};
const Wrapper = tw.div`
flex
flex-col
justify-center
items-center
`;

const RankWrap = tw.div`
w-[70%]
mt-[20px]
`;

const RankHeader = tw.div`
flex
bg-gray-500
p-[15px]
rounded-lg
`;

const RankBody = tw.div`
flex
items-center
bg-slate-100
p-[20px]
my-[10px]
rounded-lg
`;

export default RankListView;
