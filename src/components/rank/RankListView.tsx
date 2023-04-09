import tw from 'tailwind-styled-components';

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
      {rankingData?.map((rankInfo, index) => (
        <div key={index}>
          <span>{rankInfo.rankingMember.nickname}</span>
          <span>{rankInfo.rank}</span>
        </div>
      ))}
    </Wrapper>
  );
};
const Wrapper = tw.div`
flex
justify-center
`;
export default RankListView;
