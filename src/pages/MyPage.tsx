import React from 'react';
import tw from 'tailwind-styled-components';

const MyPage = () => {
  return (
    <Wrapper>
      <ProfileWrap>
        <ProfileImg
          src={
            'https://media.bunjang.co.kr/product/196437768_%7Bcnt%7D_1660535732_w%7Bres%7D.jpg'
          }
          alt='Userprofile'
        />
        <NickNameText>피카츄</NickNameText>
        <EmailText>psb4644@gmail.com</EmailText>
        <LogoutText>로그아웃</LogoutText>
      </ProfileWrap>
      <RightWrap>
        <RankHeader>
          <RankHeaderDiv>
            <RankHeaderText>랭킹</RankHeaderText>
          </RankHeaderDiv>
          <UserHeaderDiv>
            <RankHeaderText>사용자</RankHeaderText>
          </UserHeaderDiv>
          <TitleHeaderDiv>
            <RankHeaderText>칭호</RankHeaderText>
          </TitleHeaderDiv>
          <ScoreHeaderDiv>
            <RankHeaderText>개발 시간</RankHeaderText>
          </ScoreHeaderDiv>
        </RankHeader>
        <InfoBody>
          <RankBodyDiv>
            <RankBodyText>{3}등</RankBodyText>
          </RankBodyDiv>
          <UserBodyDiv className='w-[40%] flex items-center'>
            <ProfileImg2
              src={
                'https://media.bunjang.co.kr/product/196437768_%7Bcnt%7D_1660535732_w%7Bres%7D.jpg'
              }
              alt='Userprofile'
            />
            <RankBodyText>피카츄</RankBodyText>
          </UserBodyDiv>
          <TitleBodyDiv>
            <RankBodyText>시간을 지배하는자</RankBodyText>
          </TitleBodyDiv>
          <ScoreBodyDiv>
            <RankBodyText>12:34:21</RankBodyText>
          </ScoreBodyDiv>
        </InfoBody>
        <InfoBody className='justify-around'>
          <StudyContent>
            <StudyTitle>오늘의 공부 시간 </StudyTitle>
            <StudyTime>01:23:05</StudyTime>
          </StudyContent>
          <StudyContent>
            <StudyTitle>이번 시즌 공부 시간 </StudyTitle>
            <StudyTime>12:34:21</StudyTime>
          </StudyContent>
        </InfoBody>
        <InfoBody className='justify-center'>
          <GradeText>시간을 지배하는자</GradeText>
          <div className='mx-[10px] text-[#57606f]'>{'>'}</div>
          <GradeText>지배하는 시간</GradeText>
        </InfoBody>
      </RightWrap>
    </Wrapper>
  );
};

const Wrapper = tw.div`
flex
justify-center
`;

const ProfileWrap = tw.div`
flex
flex-col
items-center
justify-center
bg-slate-100
w-[250px]
h-[280px]
rounded-lg
mr-[10px]
`;

const ProfileImg = tw.img`
object-cover
w-[90px]
h-[90px]
rounded-full
mb-4
`;

const NickNameText = tw.span`
text-[#57606f]
font-semibold
text-[24px]
`;

const EmailText = tw.span`
text-[#767676]
text-[14px]
`;

const LogoutText = tw.span`
mt-[10px]
text-[#eb3b5a]
text-[14px]
`;

const RightWrap = tw.div`
w-[50%]
`;

const RankHeader = tw.div`
flex
bg-gray-500
p-[15px]
rounded-lg
`;

const InfoBody = tw.div`
flex
items-center
bg-slate-100
p-[20px]
my-[10px]
rounded-lg
`;

const RankHeaderDiv = tw.div`
w-[10%]
ml-[30px]
`;

const RankBodyDiv = tw.div`
w-[10%]
ml-[30px]
`;

const UserHeaderDiv = tw.div`
w-[40%]
`;

const UserBodyDiv = tw.div`
w-[40%]
`;

const TitleHeaderDiv = tw.div`
w-[30%]
`;

const TitleBodyDiv = tw.div`
w-[30%]
`;

const ScoreHeaderDiv = tw.div`
w-[30%]
`;

const ScoreBodyDiv = tw.div`
w-[30%]
`;

const RankHeaderText = tw.span`
text-white
font-semibold
text-[20px]
`;

const RankBodyText = tw.span`
text-[#57606f]
font-semibold
text-[22px]
`;

const ProfileImg2 = tw.img`
object-cover
w-[60px]
h-[60px]
rounded-full
mr-[20px]
`;

const StudyContent = tw.div`

`;

const StudyTitle = tw.span`
text-[20px]
text-[#767676]
font-semibold
`;

const StudyTime = tw.span`
text-[20px]
text-purple
font-semibold
`;

const GradeText = tw.span`
text-[20px]
font-semibold
text-[#57606f]
`;

export default MyPage;
