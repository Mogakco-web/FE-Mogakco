import React from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Lottie from 'lottie-react';
import catWithLaptop from '../lottie/catWithLaptop.json';

const Home = () => {
  return (
    <Wrapper>
      <Contents>
        <Title>모각코에서 같이 커밋해요!</Title>
        <p>리워드, 랭킹을 통한 동기부여로 더더욱 성장하게 된답니다.</p>
        <Button>
          <Link to='/login'>같이 성장하기🌱</Link>
        </Button>
        <Lottie animationData={catWithLaptop} />
      </Contents>
    </Wrapper>
  );
};
export default Home;

const Wrapper = tw.div`
`;
const Contents = tw.div`
flex
flex-col
items-center
p-[100px]
`;
const Title = tw.div`
text-4xl
font-bold
p-2
`;
const Button = tw.button`
bg-gradient-to-r from-purple to-blue
p-2
m-4
rounded-lg
hover:from-cosmicBlue hover:to-yellow
text-white
font-bold
shadow-lg
`;
