import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface UserInfo {
  userId: string;
  userImg: string;
  userOauthId: string;
}

interface Store {
  isLogin: boolean;
  userInfo: UserInfo;
  handleIsLogin: () => void;
  setUserInfo: (userId: string, userImg: string, userOauthId: string) => void;
}

const userStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        userInfo: { userId: '', userImg: '', userOauthId: '' },
        handleIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
        setUserInfo: (userId, userImg, userOauthId) =>
          set((state) => ({
            ...state,
            userInfo: {
              userId: userId,
              userImg: userImg,
              userOauthId: userOauthId,
            },
          })),
      }),
      { name: 'user-storage' },
    ),
  ),
);

export default userStore;
