import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
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

  // 랭킹 초기화
  const {
    data: resetRankData,
    mutate: resetRankMutate,
    isLoading: resetRankLoading,
  } = useMutation(rankApis.resetRank, {
    onSuccess: (res) => {
      // console.log(res);
    },
    // onError: (error) => alert('오류 발생.'),
  });

  useEffect(() => {
    resetRankMutate();
  }, []);

  return (
    <div>
      <RankListView rankingData={RankingData}></RankListView>
    </div>
  );
};

export default Ranking;
