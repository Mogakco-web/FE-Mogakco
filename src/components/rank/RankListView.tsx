import tw from 'tailwind-styled-components';

interface IProps {
  rankingData: [
    {
      rank: number;
      score: number;
      memberResponseDTO: {
        email: string;
        nickname: string;
        member_imgUrl: string;
      };
    },
  ];
}

const RankListView = ({ rankingData }: IProps) => {
  return (
    <Wrapper>
      {rankingData?.map((rankInfo, index) => (
        <div key={index}>
          <span>{rankInfo.memberResponseDTO.nickname}</span>
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
