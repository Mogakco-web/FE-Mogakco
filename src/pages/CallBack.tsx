import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';

const CallBack = () => {
  const { handleIsLogin, setUserInfo } = userStore();
  const navigate = useNavigate();
  const accessToken = getTokenParam('accessToken');
  const refreshToken = getTokenParam('refreshToken');

  const setToken = () => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    handleIsLogin();
    navigate(`/`);
  };
  const getUserInfo = async () => {
    const res = await axios.get(`/api/v1/member/userInfo/one`, {
      headers: { Authorization_refresh: `${refreshToken}` },
    });
    // console.log(res);
    localStorage.setItem('authToken', res.data.authToken);
    setUserInfo(res.data.nickname, res.data.member_imgUrl, res.data.oauthId);
  };
  useEffect(() => {
    setToken();
    getUserInfo();
  }, []);
  return <>로딩 중</>;
};

export default CallBack;

function getTokenParam(key: string) {
  return new URLSearchParams(window.location.search).get(key) as string;
}
