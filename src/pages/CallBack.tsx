import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApis } from '../api/user';
import userStore from '../store/userStore';
const CallBack = () => {
  const { handleIsLogin, setUserInfo } = userStore();
  const navigate = useNavigate();

  const setToken = () => {
    const accessToken = getTokenParam('accessToken');
    const refreshToken = getTokenParam('refreshToken');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    handleIsLogin();
    navigate(`/`);
  };

  const getUserInfo = () => {
    userApis
      .userInfo()
      .then((res) => {
        localStorage.setItem('authToken', res.data.authToken);
        setUserInfo(
          res.data.nickname,
          res.data.member_imgUrl,
          res.data.oauthId,
        );
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
