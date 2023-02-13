import React from 'react';
import tw from 'tailwind-styled-components';
import userStore from '../store/userStore';

const loginUrl = `http://3.36.247.153:8080/oauth2/authorization/github`;
const Login = () => {
  const { handleIsLogin, setUserInfo } = userStore();
  return (
    <>
      <Button>
        <a href={loginUrl}>GitHub 아이디로 로그인</a>
      </Button>
      <Button
        onClick={() => {
          handleIsLogin();
          setUserInfo('', '');
        }}>
        임시 로그아웃
      </Button>
    </>
  );
};

export default Login;

const Button = tw.button`
bg-sky
m-2
`;
