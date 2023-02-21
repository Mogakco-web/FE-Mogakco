import axios from 'axios';
import React from 'react';
import tw from 'tailwind-styled-components';
import userStore from '../store/userStore';

const loginUrl = `http://3.38.8.89:8080/oauth2/authorization/github`;
const Login = () => {
  const { handleIsLogin, setUserInfo } = userStore();
  const Logout = async () => {
    const config = {
      headers: {
        authToken: localStorage.getItem('authToken'),
      },
    };
    // const result = await axios.delete('/api/v1/eliminate/authToken', config);
    // console.log(result);
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
