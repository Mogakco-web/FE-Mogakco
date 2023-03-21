import create from 'zustand';
interface ITime {
  second: number;
  minute: number;
  hour: number;
}
interface IStore {
  time: ITime;
  setTime: (hour: number, minute: number, second: number) => void;
  setTimeClear: () => void;
}
const init: ITime = {
  second: 0,
  minute: 0,
  hour: 0,
};
const useStopwatchStore = create<IStore>((set) => ({
  time: init,
  setTime: (hour, minute, second) =>
    set((state) => ({ ...state, time: { hour, minute, second } })),
  setTimeClear: () => set({ time: init }),
}));

export default useStopwatchStore;
