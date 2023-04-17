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
          <RankHeaderDiv>
            <RankHeaderText>랭킹</RankHeaderText>
          </RankHeaderDiv>
          <UserHeaderDiv>
            <RankHeaderText>사용자</RankHeaderText>
          </UserHeaderDiv>
          <TitleHeaderDiv>
            <RankHeaderText>칭호</RankHeaderText>
          </TitleHeaderDiv>
          <ScoreHeaderDiv>
            <RankHeaderText>개발 시간</RankHeaderText>
          </ScoreHeaderDiv>
        </RankHeader>
        {rankingData?.map((rankInfo, index) => (
          <RankBody key={index}>
            <RankBodyDiv>
              <RankBodyText>{rankInfo.rank}등</RankBodyText>
            </RankBodyDiv>
            <UserBodyDiv className='w-[40%] flex items-center'>
              <ProfileImg
                src={rankInfo.rankingMember.member_imgUrl}
                alt='Userprofile'
              />
              <RankBodyText>{rankInfo.rankingMember.nickname}</RankBodyText>
            </UserBodyDiv>
            <TitleBodyDiv>
              <RankBodyText>시간을 지배하는자</RankBodyText>
            </TitleBodyDiv>
            <ScoreBodyDiv>
              <RankBodyText>{rankInfo.score}</RankBodyText>
            </ScoreBodyDiv>
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

const RankHeaderDiv = tw.div`
w-[10%]
ml-[30px]
`;

const RankBodyDiv = tw.div`
w-[10%]
ml-[30px]
`;

const UserHeaderDiv = tw.div`
w-[40%]
`;

const UserBodyDiv = tw.div`
w-[40%]
`;

const TitleHeaderDiv = tw.div`
w-[30%]
`;

const TitleBodyDiv = tw.div`
w-[30%]
`;

const ScoreHeaderDiv = tw.div`
w-[30%]
`;

const ScoreBodyDiv = tw.div`
w-[30%]
`;

const RankHeaderText = tw.span`
text-white
font-semibold
text-[20px]
`;

const RankBodyText = tw.span`
text-[#57606f]
font-semibold
text-[22px]
`;

const ProfileImg = tw.img`
object-cover
w-[60px]
h-[60px]
rounded-full
mr-[20px]
`;

export default RankListView;
