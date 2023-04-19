import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import api from '../api/ApiController';
import { rankApis } from '../api/rank';
import RankListView from '../components/rank/RankListView';

const Ranking = () => {
  const [rankData, setRanData] = useState<any>([]);
  const {
    data: resetRankData,
    mutate: resetRankMutate,
    isLoading: resetRankLoading,
  } = useMutation(rankApis.resetRank, {
    onSuccess: async (res) => {
      const rank = await api.get('/api/v1/ranking');
      setRanData(rank.data);
    },
    // onError: (error) => alert('오류 발생.'),
  });

  useEffect(() => {
    resetRankMutate();
  }, []);

  return (
    <div>
      <RankListView rankingData={rankData}></RankListView>
    </div>
  );
};

export default Ranking;
