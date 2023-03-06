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
bg-white
w-[19%]
text-center
h-[45vh]
`;
const Record = tw.div`
text-xl
`;
export default TimeRecord;
