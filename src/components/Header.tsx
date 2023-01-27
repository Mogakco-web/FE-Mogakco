import React from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
const MemberNav = () => {
  return (
    <MenuContainer>
      <Menu>
        <Link to='/rank'>랭킹</Link>
      </Menu>
      <Menu>
        <Link to='/timer'>타이머</Link>
      </Menu>
      <Menu>
        <Link to='/todo'>투두리스트</Link>
      </Menu>
      <Menu>
        <Link to='/cdtest'>코딩테스트</Link>
      </Menu>
      <Menu>
        <Link to='/mypage'>마이페이지</Link>
      </Menu>
    </MenuContainer>
  );
};
const GuestNav = () => {
  return (
    <MenuContainer>
      <Menu>
        <Link to='/rank'>랭킹</Link>
      </Menu>
      <Menu>
        <Link to='/notice'>공지사항</Link>
      </Menu>
      <Menu>
        <Link to='/q&a'>Q&A</Link>
      </Menu>
    </MenuContainer>
  );
};
const Header = () => {
  return (
    <MyHeader>
      <Link to='/'>
        <Logo
          src={`${process.env.PUBLIC_URL}/mogakco_logo.png`}
          alt='모각코 로고'></Logo>
      </Link>
      <nav>
        {/* <GuestNav /> */}
        <MemberNav />
      </nav>
      {/* <nav>{isLogged ? <MemberNav /> : <GuestNav />}</nav> */}
    </MyHeader>
  );
};

export default Header;

const MyHeader = tw.div`
sticky
top-0
z-10
w-screen
h-16
p-3
flex
justify-between
items-center
`;
const Logo = tw.img`
w-12
`;
const MenuContainer = tw.div`
flex
gap-3
m-5
`;
const Menu = tw.li`
list-none
cursor-pointer
`;
