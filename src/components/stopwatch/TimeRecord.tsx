import React from 'react';
import tw from 'tailwind-styled-components';

const TimeRecord = () => {
  return (
    <Wrapper>
      <Record>전날 기록</Record>
      <Record>전전날 기록</Record>
    </Wrapper>
  );
};
const Wrapper = tw.div`
text-center
`;
const Record = tw.div`
text-xl
`;
export default TimeRecord;
