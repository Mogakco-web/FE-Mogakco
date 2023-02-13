import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';

const CallBack = () => {
  const { handleIsLogin } = userStore();
  const navigate = useNavigate();
  const accessToken = getToken('accessToken');
  const refreshToken = getToken('refreshToken');

  const setToken = () => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    handleIsLogin();
    navigate(`/`);
  };
  useEffect(() => {
    setToken();
  }, []);
  return <>로딩 중</>;
};

export default CallBack;

function getToken(key: string) {
  return new URLSearchParams(window.location.search).get(key) as string;
}
