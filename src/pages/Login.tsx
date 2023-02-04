import React from 'react';
import tw from 'tailwind-styled-components';
import userStore from '../store/userStore';

const loginUrl = `https://github.com/login/oauth/authorize?client_id=aed31f0dad5ed858d765&scope=repo:status read:repo_hook user:email&redirect_uri=http://localhost:3000/callback`;

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
