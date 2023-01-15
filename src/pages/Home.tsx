import React from 'react';
import useStore from '../store/userStore';
import tw from 'tailwind-styled-components';

const Home = () => {
  const { isDark, handleIsDark } = useStore();
  return (
    <Wrapper>
      <Hi>테일윈드 테스트</Hi>
      <p>Zustand TEST : 지금 화면은 {isDark ? '다크' : '화이트'} 모드이다</p>
      <button onClick={handleIsDark}>클릭시 화면 모드 변경</button>
    </Wrapper>
  );
};

const Wrapper = tw.div`
`;

const Hi = tw.div`
w-fit
text-cpColor
`;

export default Home;
