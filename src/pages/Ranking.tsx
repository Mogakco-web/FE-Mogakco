import { useQuery } from 'react-query';
import { rankApis } from '../api/rank';
import RankListView from '../components/rank/RankListView';

const Ranking = () => {
  const {
    data: RankingData,
    refetch,
    isLoading,
  } = useQuery(['rank'], rankApis.getRank, {
    select: (res) => res.data,
    onSuccess: (res) => {
      // console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <RankListView rankingData={RankingData}></RankListView>
    </div>
  );
};

export default Ranking;
