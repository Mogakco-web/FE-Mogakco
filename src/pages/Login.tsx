import React from 'react';
import tw from 'tailwind-styled-components';
import userStore from '../store/userStore';
import { userApis } from '../api/ApiController';

const loginUrl: string = `http://3.38.8.89:8080/oauth2/authorization/github`;

const Login = () => {
  const { handleIsLogin, setUserInfo } = userStore();
  const Logout = async () => {
    const authToken: string | null = localStorage.getItem('authToken');
    userApis
      .logOut(authToken)
      .then((res) => {
        console.log(res);
        localStorage.clear();
        // localStorage.removeItem('authToken');
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('refreshToken');
      })
      .catch((err) => {
        console.log(err);
      });
    handleIsLogin();
    setUserInfo('', '', '');
  };
  return (
    <>
      <Button>
        <a href={loginUrl}>GitHub 아이디로 로그인</a>
      </Button>
      <Button onClick={Logout}>임시 로그아웃</Button>
    </>
  );
};

export default Login;

const Button = tw.button`
bg-sky
m-2
`;
