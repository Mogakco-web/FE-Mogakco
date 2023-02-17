import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';

const CallBack = () => {
  const { handleIsLogin } = userStore();
  const navigate = useNavigate();
  const accessToken = getTokenParam('accessToken');
  const refreshToken = getTokenParam('refreshToken');
  const authToken = getTokenParam('AuthToken');

  const setToken = () => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('authToken', authToken);

    handleIsLogin();
    navigate(`/`);
  };
  useEffect(() => {
    setToken();
  }, []);
  return <>로딩 중</>;
};

export default CallBack;

function getTokenParam(key: string) {
  return new URLSearchParams(window.location.search).get(key) as string;
}
