import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallBack = () => {
  const navigate = useNavigate();
  console.log(getCode('code'));
  useEffect(() => {
    const postCode = async () => {
      getCode('code');
      try {
        // const response = await axios.post(``);
        navigate(`/`);
      } catch (err) {
        console.log(err);
      }
    };
    postCode();
  }, []);
  return <>로딩 중</>;
};

export default CallBack;

function getCode(key: string) {
  return new URLSearchParams(window.location.search).get(key);
}
