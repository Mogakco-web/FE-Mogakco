import React from 'react';
import tw from 'tailwind-styled-components';
import userStore from '../store/userStore';
import { userApis } from '../api/ApiController';
import axios from 'axios';

const loginUrl: string = `http://3.38.8.89:8080/oauth2/authorization/github`;

const Login = () => {
  const { handleIsLogin, setUserInfo } = userStore();
  const Logout = async () => {
    const authToken: string | null = localStorage.getItem('authToken');
    userApis
      .logOut(authToken)
      .then((res) => {
        console.log('로그아웃 성공', res);
        localStorage.clear();
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
      <Button
        onClick={() => {
          axios.post('api/v1/healthcheck').then((res) => console.log(res));
        }}>
        헬스 체크
      </Button>
    </>
  );
};

export default Login;

const Button = tw.button`
bg-sky
m-2
`;
