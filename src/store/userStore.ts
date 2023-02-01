import create from 'zustand';
import { devtools } from 'zustand/middleware';
interface IStore {
  isLogin: boolean;
  userName: String;
  handleIsLogin: () => void;
}

const userStore = create<IStore>()(
  devtools((set) => ({
    isLogin: false,
    userName: '',
    handleIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
  })),
);

export default userStore;
