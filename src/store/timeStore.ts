import create from 'zustand';

interface IStore {
  time: number;
  setTime: (data: number) => void;
  setTimeClear: () => void;
}

const useTimeStore = create<IStore>((set) => ({
  time: 0,
  setTime: (data) => set((state) => ({ time: state.time + data })),
  setTimeClear: () => set({ time: 0 }),
}));

export default useTimeStore;
