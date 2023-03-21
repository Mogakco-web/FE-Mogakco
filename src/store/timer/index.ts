import create from 'zustand';
interface Time {
  second: number;
  minute: number;
  hour: number;
}
interface Store {
  time: Time;
  setTime: (hour: number, minute: number, second: number) => void;
  setTimeClear: () => void;
}
const init: Time = {
  second: 0,
  minute: 0,
  hour: 0,
};
const useStopwatchStore = create<Store>((set) => ({
  time: init,
  setTime: (hour, minute, second) =>
    set((state) => ({ ...state, time: { hour, minute, second } })),
  setTimeClear: () => set({ time: init }),
}));

export default useStopwatchStore;
