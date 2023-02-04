import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface IStore {
  isLogin: boolean;
  userInfo: object;
  handleIsLogin: () => void;
  setUserInfo: (userId: string, userImg: string) => void;
}

const userStore = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        userInfo: { userId: '', userImg: '' },
        handleIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
        setUserInfo: (userId, userImg) =>
          set((state) => ({
            ...state,
            userInfo: { userId: userId, userImg: userImg },
          })),
      }),
      { name: 'user-storage' },
    ),
  ),
);

export default userStore;
