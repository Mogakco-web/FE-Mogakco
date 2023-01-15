import React from 'react';
import useStore from '../store/userStore';
import Header from '../components/Header';
import tw from 'tailwind-styled-components';

const Home = () => {
  const { isDark, handleIsDark } = useStore();
  return (
    <Wrapper>
      <Header />
      <p>Zustand TEST : 지금 화면은 {isDark ? '다크' : '화이트'} 모드이다</p>
      <button onClick={handleIsDark}>클릭시 화면 모드 변경</button>
    </Wrapper>
  );
};

const Wrapper = tw.div`
`;

export default Home;
