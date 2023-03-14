interface ITime {
  second: number;
  minute: number;
  hour: number;
}
export const formatTime = (time: ITime) => {
  const getHours: string = time.hour.toString().padStart(2, '0');
  const getMinutes: string = time.minute.toString().padStart(2, '0');
  const getSeconds: string = time.second.toString().padStart(2, '0');
  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const today = new Date();

export const transDate = () => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${String(year).padStart(2, '0')}-${String(month).padStart(
    2,
    '0',
  )}-${String(day).padStart(2, '0')}`;
};

export const transYesterDate = () => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate() - 1;
  return `${String(year).padStart(2, '0')}-${String(month).padStart(
    2,
    '0',
  )}-${String(day).padStart(2, '0')}`;
};
