import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Lottie from 'lottie-react';
import catWithLaptop from '../lottie/catWithLaptop.json';
import userStore from '../store/userStore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase/firebase';
import { userApis } from '../api/user';
const Home = () => {
  const { isLogin, userInfo } = userStore();
  const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const fcmToken = localStorage.getItem('fcmToken');
        if (fcmToken) {
          userApis.FcmSend({
            oauthId: userInfo.userOauthId,
            fcmToken: fcmToken,
          });
        } else {
          getToken(messaging, { vapidKey: process.env.REACT_APP_VAPIDKEY })
            .then((token) => {
              localStorage.setItem('fcmToken', token);
              userApis.FcmSend({
                oauthId: userInfo.userOauthId,
                fcmToken: token,
              });
            })
            .catch((error) => {
              console.error('FCM 토큰 가져오기 실패:', error);
            });
        }
      } else {
        console.log('알림 권한 허용 안됨');
      }
    });
  };

  useEffect(() => {
    if (userInfo.userOauthId) {
      requestPermission();
    }
  }, [userInfo]);
  return (
    <Wrapper>
      <Contents>
        <Title>모각코에서 같이 커밋해요!</Title>
        <p>리워드, 랭킹을 통한 동기부여로 더더욱 성장하게 된답니다.</p>
        <Button>
          <Link to='/login'>같이 성장하기🌱</Link>
        </Button>
        <Lottie animationData={catWithLaptop} />
      </Contents>
    </Wrapper>
  );
};
export default Home;

const Wrapper = tw.div`
`;
const Contents = tw.div`
flex
flex-col
items-center
p-[100px]
`;
const Title = tw.div`
text-4xl
font-bold
p-2
`;
const Button = tw.button`
bg-gradient-to-r from-purple to-blue
p-2
m-4
rounded-lg
hover:from-cosmicBlue hover:to-yellow
text-white
font-bold
shadow-lg
`;
