import React from 'react';
import tw from 'tailwind-styled-components';

const loginUrl = `https://github.com/login/oauth/authorize?client_id=aed31f0dad5ed858d765&scope=repo:status read:repo_hook user:email&redirect_uri=http://localhost:3000/callback`;
const Login = () => {
  return (
    <>
      <Button>
        <a href={loginUrl}>GitHub 아이디로 로그인</a>
      </Button>
    </>
  );
};

export default Login;

const Button = tw.button`
bg-sky
m-2
`;
