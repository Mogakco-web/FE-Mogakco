import { useMutation, useQuery } from 'react-query';
import { getRecord } from '../../api/timer';
function useRecord() {
  // 타임 정지시 기록하기
  const { mutate } = useMutation(getRecord, {
    onSuccess: (res) => {
      // console.log(res);
    },
    onError: (error) => alert('오류 발생.'),
  });
  return { mutate };
}

export default useRecord;
