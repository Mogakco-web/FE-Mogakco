import React from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const Home = () => {
  return (
    <Wrapper>
      <Contents>
        <Title>모각코에서 같이 커밋해요!</Title>
        <p>리워드, 랭킹을 통한 동기부여로 더더욱 성장하게 된답니다.</p>
        <Button>
          <Link to='/login'>무료로 시작하세요</Link>
        </Button>
        <Image src='https://user-images.githubusercontent.com/65716445/212556936-bab5b444-6f65-4118-a5d9-e6a0036a44bb.png'></Image>
      </Contents>
      <SubContents>
        <Intro>
          <p>게임처럼 관리해보세요.</p>
          <Span>뱃지를 달아보세요.</Span>
          <Span>깃허브 기록을 관리하세요.</Span>
          <Span>당신의 랭킹을 확인해보세요</Span>
          <p>더 자세한 설명 설명 설명 추가 추가</p>
        </Intro>
        <SubImage src='https://user-images.githubusercontent.com/65716445/212558210-b5f39491-4002-4196-b78a-0983fa35fa9a.png'></SubImage>
      </SubContents>
      <SubContents>
        <SubImage src='https://user-images.githubusercontent.com/65716445/212558210-b5f39491-4002-4196-b78a-0983fa35fa9a.png'></SubImage>
        <Intro>
          <p>게임처럼 관리해보세요.</p>
          <Span>뱃지를 달아보세요.</Span>
          <Span>깃허브 기록을 관리하세요.</Span>
          <Span>당신의 랭킹을 확인해보세요</Span>
          <p>더 자세한 설명 설명 설명 추가 추가</p>
        </Intro>
      </SubContents>
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
p-2
`;
const Button = tw.button`
bg-gradient-to-r from-purple to-blue
p-2
m-4
rounded-lg
hover:from-red hover:to-yellow
text-white
`;
const Image = tw.img`
w-100
rounded-xl
mt-10
shadow-2xl
`;
const SubContents = tw.div`
flex
items-center
justify-between
px-[100px]
pb-[100px]
shadow-xl
rounded-2xl
mb-14
`;
const Intro = tw.div`
flex
flex-col
mt-10
`;
const Span = tw.span`
text-2xl
`;
const SubImage = tw.img`
w-80
rounded-lg
mt-12
`;
