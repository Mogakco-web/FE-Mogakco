import create from 'zustand';
interface ITime {
  second: number;
  minute: number;
  hour: number;
}
interface IStore {
  time: ITime;
  setTime: (second: number, minute: number, hour: number) => void;
  setTimeClear: () => void;
}
const init: ITime = {
  second: 0,
  minute: 0,
  hour: 0,
};
const useStopwatchStore = create<IStore>((set) => ({
  time: init,
  setTime: (second, minute, hour) =>
    set((state) => ({ ...state, time: { second, minute, hour } })),
  setTimeClear: () => set({ time: init }),
}));

export default useStopwatchStore;
