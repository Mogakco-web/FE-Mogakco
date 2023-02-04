import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';

const CallBack = () => {
  const { handleIsLogin, setUserInfo } = userStore();
  const navigate = useNavigate();
  const code = getCode('code');
  const postCode = async () => {
    try {
      const result = await axios.get(`/api/v1/githubLogin?code=${code}`);
      console.log(result);
      handleIsLogin();
      setUserInfo(result.data.login, result.data.avatar_url);
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    postCode();
  }, []);
  return <>로딩 중</>;
};

export default CallBack;

function getCode(key: string) {
  return new URLSearchParams(window.location.search).get(key);
}
