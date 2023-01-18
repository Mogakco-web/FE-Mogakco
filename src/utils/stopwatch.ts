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
